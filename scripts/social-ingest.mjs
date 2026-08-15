import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'artifacts/majang-mejeng');
const outDir = path.join(root, 'public', 'media');
const outFile = path.join(outDir, 'social-feed.json');

const instagramEndpoint = process.env.INSTAGRAM_MEDIA_ENDPOINT || '';
const instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const tiktokToken = process.env.TIKTOK_ACCESS_TOKEN || '';

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}

async function instagram() {
  if (!instagramEndpoint || !instagramToken) return [];
  const url = new URL(instagramEndpoint);
  url.searchParams.set('access_token', instagramToken);
  if (!url.searchParams.has('fields')) {
    url.searchParams.set('fields', 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp');
  }
  const data = await jsonFetch(url);
  const items = data.data || [];
  return items.map((x) => ({
    source: 'instagram', id: x.id, caption: x.caption || '',
    mediaType: x.media_type, mediaUrl: x.media_url || x.thumbnail_url || '',
    permalink: x.permalink || '', timestamp: x.timestamp || ''
  }));
}

async function tiktok() {
  if (!tiktokToken) return [];
  const data = await jsonFetch('https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link,create_time,like_count,comment_count,share_count,view_count', {
    method: 'POST', headers: { Authorization: `Bearer ${tiktokToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ max_count: 20 })
  });
  return (data.data?.videos || []).map((x) => ({
    source: 'tiktok', id: x.id, title: x.title || '',
    caption: x.video_description || '', mediaType: 'video',
    mediaUrl: x.cover_image_url || '', permalink: x.embed_link || '',
    timestamp: x.create_time ? new Date(x.create_time * 1000).toISOString() : '',
    metrics: { views: x.view_count || 0, likes: x.like_count || 0, comments: x.comment_count || 0, shares: x.share_count || 0 }
  }));
}

const [ig, tt] = await Promise.allSettled([instagram(), tiktok()]);
const errors = [];
if (ig.status === 'rejected') errors.push(`instagram: ${ig.reason?.message || ig.reason}`);
if (tt.status === 'rejected') errors.push(`tiktok: ${tt.reason?.message || tt.reason}`);
const items = [
  ...(ig.status === 'fulfilled' ? ig.value : []),
  ...(tt.status === 'fulfilled' ? tt.value : [])
].sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(outFile, JSON.stringify({
  version: 1,
  generatedAt: new Date().toISOString(),
  policy: { sourceRequired: true, onlyApprovedMedia: true, neverFabricateSocialContent: true },
  accounts: { instagram: 'https://www.instagram.com/majangmejeng_/', tiktok: 'https://www.tiktok.com/@majangmejeng_?lang=id-ID' },
  errors, items
}, null, 2));

console.log(`social ingest: ${items.length} items`);
if (errors.length) console.warn(errors.join('\n'));

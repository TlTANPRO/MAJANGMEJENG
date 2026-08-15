import { useEffect } from 'react';
import V6 from './V6';

/** V7 orchestration layer. Keeps the proven V6 route/component contract while
 * adding a first-party social feed bridge. The bridge only renders media that
 * arrives through the approved official-API manifest; it never fabricates posts.
 */
function SocialFeedBridge() {
  useEffect(() => {
    let disposed = false;
    let node: HTMLElement | null = null;

    fetch(`${import.meta.env.BASE_URL}media/social-feed.json`, { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : null)
      .then((feed) => {
        if (disposed || !feed?.items?.length) return;
        const target = document.querySelector<HTMLElement>('.social-section');
        const cards = target?.querySelector<HTMLElement>('.social-cards');
        if (!target || !cards) return;

        node = document.createElement('div');
        node.className = 'mm-social-feed';
        node.setAttribute('aria-label', 'Latest Majang Mejeng social previews');
        const heading = document.createElement('div');
        heading.className = 'mm-social-feed-heading';
        heading.innerHTML = '<span>LIVE / SOCIAL CURRENT</span><strong>Latest signals.</strong>';
        node.appendChild(heading);

        for (const item of feed.items.slice(0, 6)) {
          const a = document.createElement('a');
          a.className = 'mm-social-feed-card';
          a.href = item.permalink || '#';
          a.target = '_blank';
          a.rel = 'noreferrer';
          a.innerHTML = item.mediaUrl
            ? `<img src="${item.mediaUrl}" alt="${String(item.caption || item.title || 'Majang Mejeng social post').replace(/"/g, '&quot;')}" loading="lazy"><span>${String(item.source).toUpperCase()}</span>`
            : `<span>${String(item.source).toUpperCase()}</span>`;
          node.appendChild(a);
        }

        target.insertBefore(node, cards);
      })
      .catch(() => undefined);

    return () => {
      disposed = true;
      node?.remove();
    };
  }, []);

  return null;
}

export default function V7() {
  useEffect(() => {
    document.documentElement.dataset.mmVersion = 'v7';
    document.body.dataset.mmVersion = 'v7';
    return () => {
      delete document.documentElement.dataset.mmVersion;
      delete document.body.dataset.mmVersion;
    };
  }, []);

  return <><V6 /><SocialFeedBridge /></>;
}

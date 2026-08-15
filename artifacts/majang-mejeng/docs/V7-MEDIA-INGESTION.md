# Majang Mejeng V7 — Real Media Ingestion

## Objective

V7 is intentionally **content-authentic**: the site must not present invented photos, creators, testimonials, engagement figures, or social posts as if they came from `@majangmejeng_`.

The public profile URLs are:

- Instagram: https://www.instagram.com/majangmejeng_/
- TikTok: https://www.tiktok.com/@majangmejeng_?lang=id-ID

Direct scraping is not used. Instagram/TikTok access is platform-controlled and can require authentication, permissions, rate limits, or expiring CDN URLs.

## Approved pipeline

```text
Instagram / TikTok
        ↓
OAuth / approved export
        ↓
raw social metadata
        ↓
editorial scoring
        ↓
manual approval
        ↓
image/video optimization
        ↓
self-hosted public/media assets
        ↓
media-manifest.json
        ↓
V7 homepage / Stories / People / Places / Social Current
```

## Editorial scoring

Use this default score before featuring an asset:

- Visual quality: 25%
- Engagement signal: 20%
- Story potential: 20%
- Brand relevance: 15%
- Originality: 10%
- Editorial potential: 10%

Suggested thresholds:

- 90–100: Hero / Featured
- 82–89: Primary story
- 74–81: Social Current
- below 74: Archive / do not feature automatically

## Media rules

1. Preserve the original source URL and post ID.
2. Record permission/ownership status.
3. Never hotlink an expiring social CDN URL as the permanent site asset.
4. Generate responsive WebP/AVIF derivatives.
5. Keep an original/master outside the public web bundle.
6. Store `alt`, `caption`, `creator`, `location`, `date`, `category`, and `source` metadata.
7. A missing feed is rendered as a connection state, never as fabricated content.

## TikTok

The official TikTok Display API supports profile information and public videos through `user.info.basic` and `video.list`. The API can return video cover images and embed links. Cover URLs can expire, so V7 should refresh metadata before publishing stale covers.

Reference: https://developers.tiktok.com/doc/display-api-overview/

## Instagram

Use Meta's approved Instagram API/OAuth flow for the account type and permissions available to the account. Do not implement an HTML scraper or rely on undocumented endpoints.

## Current state

`public/media/media-manifest.json` intentionally contains empty media arrays until real account media is authorized/imported. This is a data-integrity safeguard.

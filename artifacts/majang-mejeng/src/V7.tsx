import { useEffect } from 'react';
import V6 from './V6';
import './social-feed.css';

type SocialItem = {
  source?: string;
  mediaUrl?: string;
  permalink?: string;
  caption?: string;
  title?: string;
};

const isHttpUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  try {
    const u = new URL(value, window.location.origin);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
};

function SocialFeedBridge() {
  useEffect(() => {
    let disposed = false;
    let node: HTMLElement | null = null;

    fetch(`${import.meta.env.BASE_URL}media/social-feed.json`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((feed: { items?: SocialItem[] } | null) => {
        if (disposed || !Array.isArray(feed?.items) || feed.items.length === 0) return;

        const target = document.querySelector<HTMLElement>('.social-section');
        const cards = target?.querySelector<HTMLElement>('.social-cards');
        if (!target || !cards) return;

        node = document.createElement('div');
        node.className = 'mm-social-feed';
        node.setAttribute('aria-label', 'Latest Majang Mejeng social previews');

        const heading = document.createElement('div');
        heading.className = 'mm-social-feed-heading';
        const eyebrow = document.createElement('span');
        eyebrow.textContent = 'LIVE / SOCIAL CURRENT';
        const title = document.createElement('strong');
        title.textContent = 'Latest signals.';
        heading.append(eyebrow, title);
        node.appendChild(heading);

        for (const item of feed.items.slice(0, 6)) {
          const anchor = document.createElement('a');
          anchor.className = 'mm-social-feed-card';
          const href = isHttpUrl(item.permalink) ? item.permalink : '#';
          anchor.href = href;
          if (href !== '#') {
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
          }

          if (isHttpUrl(item.mediaUrl)) {
            const image = document.createElement('img');
            image.src = item.mediaUrl;
            image.alt = item.caption || item.title || 'Majang Mejeng social post';
            image.loading = 'lazy';
            image.decoding = 'async';
            image.referrerPolicy = 'no-referrer';
            image.addEventListener('error', () => image.remove());
            anchor.appendChild(image);
          }

          const source = document.createElement('span');
          source.textContent = String(item.source || 'SOCIAL').toUpperCase();
          anchor.appendChild(source);
          node.appendChild(anchor);
        }

        if (node.children.length > 1) target.insertBefore(node, cards);
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
    document.documentElement.style.setProperty('--mm-base-url', import.meta.env.BASE_URL);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        document.querySelector<HTMLButtonElement>('[aria-label="Close search"]')?.click();
        document.querySelector<HTMLButtonElement>('[aria-label="Close menu"]')?.click();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      delete document.documentElement.dataset.mmVersion;
      delete document.body.dataset.mmVersion;
      document.documentElement.style.removeProperty('--mm-base-url');
    };
  }, []);

  return <><V6 /><SocialFeedBridge /></>;
}

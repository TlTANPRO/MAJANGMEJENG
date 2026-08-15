import { useEffect } from 'react';
import V6 from './V6';

/** V7 orchestration layer. Keeps the proven V6 route/component contract while
 * upgrading the visual system and preparing a first-party social-media ingest
 * contract. Real social assets are intentionally not fabricated when platform
 * access/OAuth is unavailable.
 */
export default function V7() {
  useEffect(() => {
    document.documentElement.dataset.mmVersion = 'v7';
    document.body.dataset.mmVersion = 'v7';
    return () => {
      delete document.documentElement.dataset.mmVersion;
      delete document.body.dataset.mmVersion;
    };
  }, []);

  return <V6 />;
}

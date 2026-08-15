# MAJANG MEJENG V7 — Adversarial Design Benchmark

## Scope

This benchmark audits the repository as a product, not only as a visual clone. The reference model is the continuous editorial / journey pattern used by United Carriers: strong narrative sequencing, scroll-led transitions, operational/trust layers, people/partner content, insights, FAQ and conversion.

No proprietary United Carriers assets, copy, code or media are copied. The benchmark translates the interaction principles into a social-first Indonesian editorial product.

## Repository audit — 2026-08-15

### Existing strengths

- React + Vite architecture with a dedicated V7 orchestration layer.
- Wouter route contract and Playwright journey coverage.
- Framer Motion and Radix ecosystem are available for future component-level motion/accessibility work.
- Dedicated motion CSS, social feed bridge and media ingestion documentation.
- GitHub Pages deployment with SPA fallback.
- Node 24 CI baseline; Node 20 deprecation is avoided.
- GitHub Pages base path is explicitly configured.
- Legacy `App.tsx` has been removed from the application path.

### Findings

1. V7 was initially only an orchestration wrapper around V6; the current upgrade must therefore strengthen the visual system without breaking the proven route contract.
2. Social feed injection previously used `innerHTML`; this was replaced with DOM construction and URL validation to reduce XSS and malformed-feed risk.
3. Social media is intentionally empty until approved API data exists. Invented posts, creators, engagement figures and testimonials are not acceptable production content.
4. The dotted world-network visual is the correct conceptual direction for the global signal layer; a rotating 3D globe is not.
5. GitHub Pages path safety must be enforced for every static asset. Do not use root-relative asset paths for site-local media unless the deployment path is intentionally root.
6. Reduced-motion, keyboard escape, focus-visible states, lazy image decoding and mobile-first media behavior are release requirements.
7. Metadata must describe Majang Mejeng itself, not the scaffolding platform.

## 100/100 release rubric

| Domain | Weight | Release requirement |
|---|---:|---|
| Narrative UX | 15 | Continuous journey; every major section has a reason to exist |
| Visual system | 12 | Consistent type, spacing, contrast, editorial hierarchy |
| Motion design | 12 | Scroll reveal, image transitions, hover states, progress, reduced-motion |
| Media quality | 12 | Real approved media; responsive derivatives; no broken images |
| Social integration | 8 | Instagram + TikTok source links and approved feed contract |
| Responsive UX | 10 | Touch-first mobile layout and no horizontal overflow |
| Accessibility | 8 | Semantic controls, focus states, keyboard escape, labels, reduced-motion |
| Performance | 8 | Lazy media, decoding hints, containment, no unnecessary animation work |
| Content integrity | 6 | No fabricated social claims, source metadata, approval state |
| SEO/share | 4 | Correct language, title, description, robots, OG/Twitter metadata |
| Reliability/CI | 5 | Typecheck + build + Playwright + Pages deployment gate |
| **TOTAL** | **100** | **All release gates pass** |

## Adversarial release blockers

A release is blocked by any of these:

- a broken production image or video;
- a fabricated social post, creator, metric or testimonial presented as real;
- a console error on the primary journeys;
- a route that works on desktop but not mobile;
- a keyboard-inaccessible modal/search/menu;
- a deployment-path asset resolving outside `/MAJANGMEJENG/`;
- a failing Playwright journey;
- a social CDN URL being treated as a permanent asset without refresh/ingestion policy.

## V7 experience model

```text
SOCIAL SIGNAL
      ↓
HERO / WORLD SIGNAL
      ↓
STATEMENT
      ↓
SCROLL JOURNEY
      ↓
FEATURED STORIES
      ↓
EDITORIAL WORLDS
      ↓
PEOPLE
      ↓
SOCIAL CURRENT
      ↓
FAQ / TRUST
      ↓
COLLABORATE
```

## Media model

```text
Instagram / TikTok
        ↓
Official API / approved export
        ↓
Metadata + source ID
        ↓
Editorial scoring
        ↓
Approval
        ↓
Optimized local/CDN derivative
        ↓
social-feed.json / media manifest
        ↓
V7
```

## Reference principles

- United Carriers: continuous journey, visual network/map language, service/trust sequencing, people/partners/insights and strong conversion.
- Majang Mejeng: translate those principles into a social-first editorial journey: social signal → context → person → place → culture → story → community → collaboration.

## Current quality state

The repository has the architecture and safeguards for the 100/100 target, but a literal 100/100 score must not be claimed until the live browser suite and production deployment are green and real approved social media is available through the ingestion contract.

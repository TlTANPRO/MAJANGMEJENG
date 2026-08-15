# V10 Adversarial Audit & Architecture

## Executive finding

V9 was a polished landing page but not an immersive editorial product. Its main failure mode was structural: the page was composed of independent sections with decorative motion, so scroll did not function as the narrative language.

## Benchmark decomposition

United Carriers is used as an experience benchmark only. We benchmark the following patterns:

- persistent navigation
- long-form continuous journey
- strong scene hierarchy
- service/content numbering
- visual continuity between scenes
- large-scale typography
- layered imagery
- proof/trust/content depth
- closing CTA as part of the journey

We do not copy its branding, proprietary graphics, text, or logistics-specific information.

## V9 failure modes

1. Hero and content were visually isolated.
2. Scroll only revealed sections instead of transforming a scene.
3. Globe/signal concept had no narrative consequence.
4. Social links behaved as outbound buttons instead of a content layer.
5. Footer ended the site rather than closing the story.
6. Desktop and mobile were mostly the same composition.
7. Content was too sparse to support an editorial brand.
8. Motion was mostly CSS decoration rather than stateful choreography.
9. Missing-media history created recurring 404 risk.
10. E2E tests encoded legacy V9 labels and therefore became brittle during redesign.

## V10 solution

The homepage is modeled as a sequence of pinned scenes:

00 Signal → 01 World → 02 People → 03 Places → 04 Culture → 05 Creators → 06 Social Current → 07 Stories → 08 Collaborate → loop.

Each scene has:

- enter state
- active state
- exit state
- progress-driven visual transformation
- recoverable navigation
- reduced-motion fallback

## Motion strategy

V10 uses native scroll position + requestAnimationFrame and CSS transforms for the first production pass. This intentionally avoids adding a heavy animation dependency before the scene choreography is validated. The architecture can later swap individual scenes to GSAP ScrollTrigger without changing content structure.

## Content integrity

Production may not fabricate:

- social metrics
- testimonials
- locations
- partners
- creator identities
- social posts

Local assets are preferred over fragile third-party media URLs. Social channels are official outbound destinations, with ingestion kept separate from the presentation layer.

## Adversarial test matrix

- initial load
- deep scroll
- reverse scroll
- rapid scroll
- mobile portrait
- mobile landscape
- viewport resize
- menu open/close
- keyboard focus
- reduced motion
- broken media fallback
- direct hash navigation
- browser back/forward
- no horizontal overflow
- production build

## Acceptance gate

A release is not production-ready until typecheck, production build, E2E, responsive checks and GitHub Pages deployment all pass.

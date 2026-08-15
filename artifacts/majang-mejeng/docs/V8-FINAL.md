# MAJANG MEJENG V8 FINAL

## Creative direction

**Living Signal** — a social-first editorial experience built around a Signal Network and Living Story Wall. The site does not use a literal logistics-style world map; network motion is functional navigation into stories.

## Experience flow

1. Hero — `FOLLOW WHAT IS MOVING.`
2. Living Signal — connected story nodes.
3. Living Story Wall — editorial cards with real repository media.
4. Editorial Worlds — People / Places / Culture / Food / Ideas / Creators.
5. Social Current — Instagram + TikTok entry points.
6. Collaboration — validated brief form.
7. Story detail / archive / supporting routes.

## Motion rules

- Ambient motion is limited to signal pulse and network dash.
- Scroll reveal uses IntersectionObserver.
- `prefers-reduced-motion` disables choreography and transitions.
- Motion must communicate discovery, connection, reveal, or navigation; decoration without meaning is avoided.

## Reliability

External social URLs are navigational only. No fabricated social feed is required for the core experience. Local media is used from `/public` so the homepage does not depend on third-party image delivery.

## Responsive contract

- Desktop: network + editorial wall composition.
- Mobile: stacked narrative, reduced network footprint, full-width media.
- No horizontal overflow is permitted.
- Menu becomes the primary navigation below the desktop breakpoint.

## Accessibility contract

- Semantic headings and links.
- Named controls for search/menu.
- Native form validation.
- Reduced-motion support.
- Keyboard-operable navigation and controls.

## QA gate

A V8 release is accepted only when:

- typecheck passes;
- production build passes;
- homepage journey passes;
- story/search journey passes;
- social links are present;
- collaboration form validates and completes;
- mobile navigation passes;
- story archive remains usable after scrolling;
- document width does not exceed viewport width.

## Benchmark principle

United Carriers is used as an experience benchmark for choreography, spatial hierarchy, scroll continuity, and network storytelling—not as a source for copied assets or code. V8 deliberately translates those interaction principles into a media/editorial language owned by Majang Mejeng.

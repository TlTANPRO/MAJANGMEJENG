# MAJANG MEJENG V11 — Information Gravity

## Goal
Turn the site from a motion-led landing page into an editorial media product. Motion must reveal information, not decorate empty sections.

## UX benchmark
Use United Carriers as a benchmark for narrative discipline: clear proposition, proof, system/categories, trust, insights, people/community and conversion. Do not copy its logistics visuals or brand identity.

## Core journey
01 Signal → 02 Proposition → 03 Index → 04 Proof → 05 People → 06 Places → 07 Culture → 08 Creators → 09 Current → 10 Stories → 11 Community → 12 Collaborate → 13 Loop.

## Product rules
- Every scene has a user question and an answer.
- Every major animation reveals, compares, navigates, or establishes hierarchy.
- No fabricated metrics, partners, testimonials, locations or social content.
- No broken media in production.
- Social links are distribution channels, not the content model.
- Mobile receives a dedicated choreography, not a squeezed desktop layout.

## Content model
Story: id, title, dek, category, image, source, credit, date, author, relatedIds.
Creator: id, name, discipline, location, image, storyIds, links.
Place: id, name, region, image, storyIds.
Culture: id, title, image, storyIds.
SocialChannel: platform, handle, url.

## Homepage scenes
### Signal
Question: Why should I stay?
Answer: Majang Mejeng follows what is moving around people, places and culture.

### Proposition
Question: What is Majang Mejeng?
Answer: An independent editorial current that turns local observation into stories.

### Index
Question: What can I discover?
Answer: People, Places, Culture, Creators, Stories.

### Proof
Only verified production data. If unavailable, use qualitative proof rather than invented numbers.

### Editorial modules
Each category has one hero story, supporting stories, metadata and related discovery.

### Social Current
Instagram and TikTok are linked as live edges. Website remains the canonical editorial layer.

### Conversion
Primary CTA: Submit a story / Collaborate. Secondary: Follow the current.

## Motion system
- Scroll progress drives scene timelines.
- Pinned scenes only where the transformation needs viewport continuity.
- Typography uses transform/clip reveal, never layout-jank.
- Image movement uses scale/crop/translate with restrained ranges.
- Reduced motion removes scrub and looping effects.

## Acceptance criteria
- 0 broken media requests.
- 0 console errors in production.
- Typecheck/build pass.
- E2E pass desktop + mobile.
- Navigation/deep links work.
- Keyboard and reduced-motion paths work.
- No fabricated content.
- The user can understand what Majang Mejeng is within the first 2 viewport heights.

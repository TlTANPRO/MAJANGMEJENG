# MAJANG MEJENG — UI/UX & Motion Skill Pack

This repository-level skill pack is the design contract for V10.

## Installed references

- 21st.dev — component and interaction inspiration
- GSAP + ScrollTrigger — scroll choreography and timelines
- Lenis — smooth-scroll model (reference; use only when justified)
- Framer Motion — React UI transitions and micro-interactions
- Awwwards / CSS Design Awards — immersive editorial benchmark references
- United Carriers — primary experience benchmark for continuous journey, not visual copying

## Non-negotiable UX principles

1. Scroll is an interaction input, not a section separator.
2. Every scene has enter, active, and exit states.
3. Motion must communicate hierarchy or continuity; decorative motion is secondary.
4. Desktop and mobile use dedicated choreography.
5. No fabricated content, metrics, testimonials, locations, or social data.
6. No broken or missing production assets.
7. Reduced-motion mode must preserve content hierarchy without animation.
8. Navigation remains recoverable at every depth.
9. Deep links and browser back/forward must work.
10. Every interactive element must have a keyboard-accessible equivalent.

## Motion vocabulary

- reveal: 240–600ms
- interface transition: 350–800ms
- editorial transition: 700–1400ms
- cinematic scene: 1200–3500ms
- scrub: scroll-linked, bounded and reversible
- pinned scene: only when it creates a meaningful transformation

## Review checklist

### Composition
- [ ] Strong typographic hierarchy
- [ ] Intentional whitespace
- [ ] Editorial image cropping
- [ ] Consistent grid
- [ ] No generic card-wall feel

### Motion
- [ ] Opening sequence transforms into navigation/content
- [ ] Typography participates in transitions
- [ ] Image masks/crops have narrative purpose
- [ ] Scene transitions are reversible
- [ ] No scroll-jacking that blocks normal navigation

### Content
- [ ] Source/credit metadata exists
- [ ] Social links point to official accounts
- [ ] Empty states are intentional
- [ ] Fallbacks exist for media failures

### Engineering
- [ ] Typecheck passes
- [ ] Production build passes
- [ ] E2E passes on desktop and mobile
- [ ] Reduced motion passes
- [ ] Live deployment passes

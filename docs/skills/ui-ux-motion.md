# Repository UI/UX Skill Pack

## UX
- Content-first hierarchy
- One question per scene
- Clear current-location indicator
- Progressive disclosure
- Keyboard/focus parity
- Mobile-specific composition
- Reduced-motion equivalent

## Motion
- Motion communicates state or meaning.
- Prefer transform/opacity; avoid layout animation.
- Use pinned scenes only for narrative transformations.
- Keep scroll velocity readable; never trap the user in a long animation.
- Every scene must remain understandable if motion is disabled.

## Visual QA
- Check 390x844, 768x1024, 1440x900.
- Check fast scroll, reverse scroll, refresh, deep links and reduced motion.
- Verify all image URLs return 2xx.
- Verify no horizontal overflow.

# Final Lab Task 2 – Week 7 + Week 9 cumulative project

This folder contains the cumulative StudentDirectory project for the final-term work. Week 7 persistence is preserved, and the Week 9 **Final Lab Task 2** requirements are added on top of it.

## Week 7 persistence retained
- AsyncStorage stores the student list.
- `LOAD` restores the complete saved list on startup.
- Saving runs when the list changes and is skipped during initial loading.
- `isLoading` is exposed by `StudentsProvider`.
- Reset restores the project's original seed data and persists it.

## Week 9 Final Lab Task 2
### Feature 1 — Skeleton Loading
- Six animated skeleton rows are rendered while student data loads.
- Animation uses `Animated.loop` and `Animated.sequence`, pulsing opacity between 1.0 and 0.3.

### Feature 2 — Accessibility Audit & Fix
- Main interactive controls have `accessibilityRole`, `accessibilityLabel`, and `accessibilityHint`.
- Student removal, reset, navigation, and Add Student modal controls are labeled.
- Search and form inputs have descriptive accessibility labels/hints.
- The relevant accessibility fixes are documented in component comments.

### Feature 3 — app.config.js Migration
- `app.json` was replaced with `app.config.js`.
- Typed-route configuration was preserved.
- `extra.apiUrl` switches between the Week 9 development URL and production placeholder based on `EXPO_PUBLIC_ENV`.
- `services/api.ts` reads the configured URL through `Constants.expoConfig.extra.apiUrl`.

## Submission
The Week 9 manual's Section 8 names the submission **“MAD – Summer 25 – Final Lab Task 2 Submission”** and instructs students to submit the GitHub repository URL after all three features are working.

## Runtime verification still required
Run the app locally and verify the skeleton loading, accessibility behavior with TalkBack/VoiceOver, AsyncStorage persistence, Reset behavior, and that the Expo config resolves correctly. The repository code has been updated, but a local device/emulator test cannot be performed through GitHub alone.

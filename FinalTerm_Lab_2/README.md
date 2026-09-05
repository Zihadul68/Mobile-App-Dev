# Final Lab Task 2 – Student Directory

This folder contains the cumulative StudentDirectory project used for the final-term lab work. It preserves the earlier Week 7 AsyncStorage persistence work and adds the Week 9 **Final Lab Task 2** requirements.

## Final Lab Task 2 – Week 9

### Feature 1 — Skeleton Loading
- Replaces the full-screen loading spinner with 6 StudentCard-shaped skeleton rows.
- Uses `Animated.loop` and `Animated.sequence` to pulse opacity from 1.0 to 0.3 and back.

### Feature 2 — Accessibility Audit & Fix
- Main Add and Statistics controls have `accessibilityRole`, `accessibilityLabel`, and `accessibilityHint`.
- Reset has screen-reader instructions.
- Student Remove controls are labeled and described.
- Add Student inputs and modal actions are labeled.
- Accessibility fixes are documented in the relevant component.

### Feature 3 — app.config.js Migration
- Replaced `app.json` with `app.config.js`.
- Preserved typed routes configuration.
- Added an environment-based `extra.apiUrl` value using `EXPO_PUBLIC_ENV`.
- `services/api.ts` reads the base URL from `Constants.expoConfig.extra.apiUrl`.

## Previous Week 7 work preserved
- AsyncStorage persistence for the student list.
- `LOAD` reducer action and startup restore.
- Save-on-change with an initial-load guard.
- Reset back to the project's seed student data.
- Configurable SearchBar debounce delay (default 300 ms).
- Search auto-focus after screen mount.
- Average skills per student and previous student-count badge.

## Run

```bash
npm install
npx expo start
```

## Final Lab Task 2 submission
The Week 9 manual says to submit the **GitHub repository URL** using the **“MAD – Summer 25 – Final Lab Task 2 Submission”** form after all three features are working.

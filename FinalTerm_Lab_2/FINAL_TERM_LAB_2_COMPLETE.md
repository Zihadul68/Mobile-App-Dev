# Final Cumulative Lab 2 Status — Weeks 7–9

This folder contains the latest cumulative StudentDirectory implementation through Week 9.

## Week 7 — historical implementation
Week 7 AsyncStorage persistence was implemented in earlier commits. The Week 8 manual explicitly instructs students to remove the AsyncStorage load/save effects and make the REST server the single source of truth, so the live implementation now follows Week 8 instead of running both systems at once.

## Week 8 — REST API implementation
- Express server in `server/index.js` with GET `/students`, GET `/students/:id`, POST `/students`, PATCH `/students/:id`, and DELETE `/students/:id`.
- CORS and `express.json()` middleware.
- Shared Axios instance in `services/api.ts` with timeout and JSON content type.
- StudentsProvider loads from GET `/students` and exposes `students`, `isLoading`, `error`, and a retry function.
- Add Student POSTs to the server and uses the server-assigned ID.
- StudentDetail refetches by ID, edits bio via PATCH, and deletes only after DELETE succeeds.
- GET `/students?q=` performs server-side search.

## Week 9 — final polish and Final Lab Task 2
- Reusable ErrorScreen with retry action.
- Loading/error guards on Home and Statistics.
- Six animated skeleton rows using `Animated.loop` and `Animated.sequence`.
- Empty states for no students and no search results.
- Accessibility roles, labels, and hints on interactive controls and descriptive labels on avatar images.
- Accessibility-fix comments in relevant components.
- Dynamic `app.config.js` with custom name, icon, splash, identifiers, and environment-based API URL.
- Custom PNG icon/splash assets.
- `eas.json` with an Android preview APK profile.

## Final Lab Task 2 submission
The Week 9 Section 8 task is the form named **MAD – Summer 25 – Final Lab Task 2 Submission**. It requires the GitHub repository URL after the three 10-mark features are complete.

See `FINAL_SUBMISSION_CHECKLIST.md` for the six graded task sections across the four supplied manuals and the exact remaining account/device verification steps.

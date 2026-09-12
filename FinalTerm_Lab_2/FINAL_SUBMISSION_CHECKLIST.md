# Final Submission Checklist — Weeks 6–9

## Task count from the four supplied manuals

There are **6 graded task sections** across the four manuals:

1. **Week 6 — Section 8: Final Lab Task 1** (10 marks):
   - Average Skills Per Student
   - Configurable debounce delay
   - Previous student-count badge
2. **Week 7 — Section 8: Graded Week 7 Lab Task** (100 marks): AsyncStorage persistence.
3. **Week 8 — Section 9: Graded Week 8 Lab Task** (100 marks): Express + Axios API integration.
4. **Week 8 — Section 10: Week 8 Lab Task extension / Final Lab Task 1** (10 marks): GET-by-id, PATCH bio edit, server-side search.
5. **Week 9 — Section 7: Graded Week 9 Lab Task** (100 marks): Error/loading states, empty states, accessibility, app config, EAS build.
6. **Week 9 — Section 8: Week 9 Lab Task / Final Lab Task 2** (10 marks): Skeleton loading, accessibility audit fixes, app.config.js migration.

The manuals reuse the same **Final Lab Task 1** form for the Week 6 and Week 8 extension task, so there are 6 graded task sections but only 5 distinct submission destinations if duplicate form URLs are counted once.

## Cumulative implementation in this folder

`FinalTerm_Lab_2` is the latest cumulative StudentDirectory implementation. Week 8 intentionally replaces Week 7 AsyncStorage at runtime with the REST server as the single source of truth, exactly as the Week 8 manual instructs. The older Week 7 implementation remains visible in git history.

### Week 8 REST requirements implemented

- `server/index.js`: GET /students, GET /students/:id, POST /students, PATCH /students/:id, DELETE /students/:id
- `server/package.json`: Express + CORS dependencies
- `services/api.ts`: shared Axios client with timeout and JSON content type
- provider loads with GET /students and exposes `students`, `isLoading`, `error`, `reloadStudents`
- Add Student POSTs to the API and uses the server-assigned ID
- Student Detail refetches by ID, updates bio through PATCH, and deletes only after DELETE succeeds
- GET /students supports `?q=` server-side search
- `FINAL_SUBMISSION_CHECKLIST.md` documents the client-vs-server search trade-off

### Week 9 requirements implemented

- Reusable `components/error-screen.tsx`
- Loading/error guards in Home and Statistics
- Six-row animated skeleton loader using Animated.loop + Animated.sequence
- No-results and no-students empty states
- Accessibility role/label/hint on interactive controls and labels on avatar images
- Accessibility audit comments in the components where fixes were made
- `app.config.js` with custom app name, icon, splash, iOS bundle identifier, Android package, and environment-based API URL
- `assets/icon.png` and `assets/splash.png`
- `eas.json` with an Android preview APK profile

## Search trade-off documentation

**Client-side filtering** is simple and avoids a network request for each search, but it requires the full dataset to be downloaded and filtered on the device. It is suitable for small lists.

**Server-side filtering** keeps filtering logic on the server and scales better when datasets become larger, but every debounced query requires network round-trip time and the server must remain available. This final implementation uses the server-side approach required by Week 8 Feature 3.

## Required user-side verification

The source can be inspected in GitHub, but the following cannot be truthfully marked as completed until run with the local environment/device:

- `node server/index.js` starts without errors and `http://localhost:3000/students` returns JSON.
- Add, delete, GET-by-id, PATCH, and server-side search are manually exercised.
- Stop the server and confirm the app's error screen appears.
- TalkBack or VoiceOver is exercised during the accessibility audit.
- `eas login` and `eas build --profile preview --platform android` are run from `FinalTerm_Lab_2`; the resulting build URL is submitted for the 100-mark Week 9 task.

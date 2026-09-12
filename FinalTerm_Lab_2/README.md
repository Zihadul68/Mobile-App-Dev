# StudentDirectory — Final Cumulative Implementation

This folder contains the cumulative StudentDirectory implementation through **Week 9** of AIUB Mobile Application Development (Summer 2025-26).

## Week progression

- **Week 6:** advanced hooks, Statistics screen, department breakdown, top-5 skills, debounced search, configurable debounce, search auto-focus, previous-count badge, and three-tab navigation.
- **Week 7:** AsyncStorage persistence was implemented in earlier git commits.
- **Week 8:** AsyncStorage is intentionally replaced by the Express server as the single source of truth, as required by the Week 8 manual.
- **Week 8 Final Lab Task 1:** GET-by-id, PATCH bio editing, and server-side search are implemented.
- **Week 9:** loading/error states, empty states, accessibility, custom app configuration, skeleton loading, and EAS preview configuration are implemented.

## Run the app

### 1. Start the REST server

```bash
cd server
npm install
node index.js
```

The server runs at `http://localhost:3000`.

### 2. Start Expo

In another terminal:

```bash
cd ..
npm install
npx expo start
```

On a physical phone, replace the development API URL in `app.config.js` with your computer's LAN address if needed, as described in the Week 8 manual.

## EAS preview APK

From `FinalTerm_Lab_2`:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --profile preview --platform android
```

The repository already includes `eas.json`, a custom `icon.png`, a custom `splash.png`, and valid bundle/package identifiers. A real EAS build URL still has to be generated from the student's Expo account and submitted through the Week 9 100-mark lab portal.

## Final Lab Task 1 / 2 notes

Week 8 Final Lab Task 1 and Week 9 Final Lab Task 2 use the forms named in their respective manuals. See `FINAL_SUBMISSION_CHECKLIST.md` for the exact task map, source-level audit, and the remaining device/account verification steps.

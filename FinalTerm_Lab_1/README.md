# Week 06 – Student Directory

Final-term implementation based on the Week 6 lab manual.

## Included
- `useMemo` for filtered students and average skills per student
- `useCallback` for stable student actions
- custom `useDebounce` hook
- configurable SearchBar debounce delay (default 300 ms)
- `forwardRef` SearchBar
- `useRef` previous student count with temporary change badge
- Statistics screen
- `useReducer` + `useContext` global student state
- add/remove/reset student actions

## Run

```bash
npm install
npx expo start
```

## Final graded task
The graded requirements are implemented in:
- `components/stat-bar.tsx`
- `components/search-bar.tsx`
- `hooks/use-debounce.ts`
- `app/index.tsx`
- `app/statistics.tsx`

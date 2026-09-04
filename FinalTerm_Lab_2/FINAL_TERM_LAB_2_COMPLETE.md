# Final Term Lab 2 – Week 7

Week 7 focuses on AsyncStorage persistence for the Student Directory.

## Implemented graded requirements
- AsyncStorage installed and listed in `package.json`.
- `LOAD` reducer action restores the complete saved student list.
- Students load once on app startup with `AsyncStorage.getItem()`.
- Students save whenever the list changes with `AsyncStorage.setItem()`.
- Saving is skipped while the initial load is still running.
- `isLoading` is exposed by `StudentsProvider`.
- Home screen shows an `ActivityIndicator` while persistence data is loading.
- Reset restores the project's initial student data and is persisted.

## Persistence demonstration
1. Add 2–3 students using the Add Student screen.
2. Reload or fully close and reopen the app.
3. Confirm the added students remain.
4. Press Reset, reload/reopen, and confirm the initial student list is restored.

The manual requests 8 starter students, while the faculty starter branch currently provides 6 and this project was originally based on an earlier 4-student Lab 1 dataset. The implementation intentionally uses the project's actual `initialStudents` array rather than inventing records.

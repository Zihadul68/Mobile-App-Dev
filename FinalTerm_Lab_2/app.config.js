module.exports = ({ config }) => ({
  ...config,
  name: "Student Directory Final Lab 2",
  slug: "student-directory-final-lab-2",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  scheme: "studentdirectoryfinal2",
  experiments: {
    ...config.experiments,
    typedRoutes: true,
  },
  extra: {
    ...config.extra,
    apiUrl:
      process.env.EXPO_PUBLIC_ENV === "production"
        ? "https://api.yourapp.com"
        : "http://localhost:3000",
  },
});

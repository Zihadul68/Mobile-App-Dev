module.exports = ({ config }) => ({
  ...config,
  name: "Student Directory Final Lab 2",
  slug: "student-directory-final-lab-2",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  scheme: "studentdirectoryfinal2",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0D1F4E",
  },
  experiments: {
    ...config.experiments,
    typedRoutes: true,
  },
  ios: {
    ...config.ios,
    supportsTablet: true,
    bundleIdentifier: "com.zihadul.studentdirectory",
  },
  android: {
    ...config.android,
    package: "com.zihadul.studentdirectory",
    adaptiveIcon: {
      ...(config.android?.adaptiveIcon ?? {}),
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#0D1F4E",
    },
  },
  extra: {
    ...config.extra,
    apiUrl:
      process.env.EXPO_PUBLIC_ENV === "production"
        ? "https://api.yourapp.com"
        : "http://localhost:3000",
  },
});

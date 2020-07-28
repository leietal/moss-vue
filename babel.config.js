module.exports = {
  presets: [
    [
      "@vue/app",
      {
        polyfills: [
          "es7.array.flat-map",
          "es7.array.includes",
          "es7.promise.finally",
          "es7.object.entries",
          "es7.object.values",
        ],
      },
    ],
    [
      "minify",
      {
        removeConsole: process.env.NODE_ENV === "production",
        removeDebugger: process.env.NODE_ENV !== "dev",
      },
    ],
  ],
};

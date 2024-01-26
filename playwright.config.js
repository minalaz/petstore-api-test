const config = {
  use: {
    baseURL: "https://petstore.swagger.io/v2",
    api_key: "special-key",
    timeout: 50000,
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "Chrome",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        browserName: "chromium",
        channel: "msedge",
      },
    },
    {
      name: "Firefox Mozilla",
      use: {
        browserName: "firefox",
      },
    },
  ],
  reporter: [["html", { open: "always" }]],
};

module.exports = config;

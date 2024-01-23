const config = {
  use: {
    baseURL: "https://petstore.swagger.io/v2",
    timeout: 30000,
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
};

module.exports = config;

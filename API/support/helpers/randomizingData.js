export const randomizingData = {
  randomizeLargeNumber() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  },

  randomizeNumber() {
    return Math.floor(Math.random() * 100);
  },

  randomStatus() {
    const statuses = ["unavailable", "available", "placed"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  },

  randomBoolean() {
    return Math.random() < 0.5;
  },

  randomDate() {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 10));
    return date.toISOString().replace("Z", "+0000");
  },
};

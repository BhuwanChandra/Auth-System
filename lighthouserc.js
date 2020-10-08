module.exports = {
  ci: {
    // Static site example
    collect: {
      numberOfRuns: 3,
      startServerCommand: "cd client && npm run start",
      url: ["https://auth-system-7779.herokuapp.com/"],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

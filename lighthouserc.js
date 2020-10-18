module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "cd client && npm run start",
      url: ["https://auth-system-7779.herokuapp.com/"],
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.85 }],
        "categories:best-practices": ["error", { minScore: 0.8 }],
        "categories:performance": ["error", { minScore: 0.75 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
        "dom-size": ["warn", { maxNumericValue: 1000 }],
        "first-contentful-paint": ["error", { maxNumericValue: 2500 }],
        interactive: ["error", { maxNumericValue: 5000 }],
      },
    },
  },
};

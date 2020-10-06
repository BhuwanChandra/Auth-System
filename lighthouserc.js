module.exports = {
  ci: {
    assert: {
      assertions: {
        "first-contentful-paint": ["error", { minScore: 0.7 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
}

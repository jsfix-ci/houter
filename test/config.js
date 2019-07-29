module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/__tests__/*",
    "!src/types.ts",
    "!src/index.tsx"
  ],
  coverageDirectory:"./meta/coverage",
  setupFiles: ["<rootDir>/test/setup.js"],
  testMatch: ["<rootDir>/src/**/__tests__/*.test.{js,jsx,ts,tsx}"],
  testURL: "http://localhost",
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"],
  moduleFileExtensions: ["js", "ts", "tsx", "jsx"],
  globals: {
    "ts-jest": {
      tsConfig: "../tsconfig.json"
    }
  },
  rootDir:"../"
};

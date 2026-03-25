/** @type {import('jest').Config} */
module.exports = {
  moduleNameMapper: {
    "^@/shared/backend-mock$": "<rootDir>/tests/mocks/backend-mock.ts",
    "^@gluestack-ui/config$": "<rootDir>/tests/mocks/gluestack-config.ts",
    "^@gluestack-ui/themed$": "<rootDir>/tests/mocks/gluestack-themed.tsx",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testMatch: ["<rootDir>/tests/**/*.test.ts", "<rootDir>/tests/**/*.test.tsx"],
};

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
 
  testEnvironment: "jsdom",

  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx'
  ],
  
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  transformIgnorePatterns: [
    "/node_modules/"
  ],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ]
};

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
 
  testEnvironment: "jsdom",

  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  transformIgnorePatterns: [
    "/node_modules/"
  ],

  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ]
};

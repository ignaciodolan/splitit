const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
});

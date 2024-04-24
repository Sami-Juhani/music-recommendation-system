// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src/__tests__/junit/jest'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
};
  
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/frontend/src'],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    
};
  
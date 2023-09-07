/*
Configuration file for Jest. enables collecting coverage
from all files with js, jsx. 
*/

module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less)$': '../__mocks__/styleMock.js',
      }
}
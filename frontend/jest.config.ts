import type { Config } from 'jest';

const config: Config = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    collectCoverage: true,
    coverageReporters: ['html', 'text', 'lcov', 'json-summary'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};

export default config;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}

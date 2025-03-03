/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest', // Usa ts-jest para compilar TypeScript
    testEnvironment: 'node', // Ambiente Node para os testes
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos TypeScript
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Atalho para caminhos
    },
  };
  
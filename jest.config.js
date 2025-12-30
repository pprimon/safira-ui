/** @type {import('jest').Config} */
export default {
  // Ambiente de teste
  testEnvironment: 'jsdom',
  
  // Arquivos de setup
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Padrões de arquivos de teste
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  
  // Transformações
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
      useESM: true,
    }],
  },
  
  // Extensões de arquivo
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Mapeamento de módulos
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/theme/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/index.ts',
  ],
  
  // Thresholds de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Diretório de relatórios de cobertura
  coverageDirectory: 'coverage',
  
  // Reporters de cobertura
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Ignorar arquivos
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
  ],
  
  // Configurações do ambiente
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  
  // Verbose output
  verbose: true,
  
  // Clear mocks entre testes
  clearMocks: true,
  
  // Restore mocks após cada teste
  restoreMocks: true,
  
  // Configuração para ES modules
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["**/*.{spec,test}.{ts,js}"],
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^@root/(.*)$": "<rootDir>/src/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1"
  },
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json"
    }
  }
};
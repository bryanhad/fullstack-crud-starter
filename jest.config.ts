import type { Config } from "jest";

const config: Config = {
   preset: "ts-jest", // Use ts-jest for TS files
   testEnvironment: "node", // Node environment
   roots: ["<rootDir>/tests"], // put all your tests in /tests
   moduleFileExtensions: ["ts", "js", "json"],
   clearMocks: true, // automatically clear mocks between tests
   verbose: true, // optional: show individual test results
   testMatch: ["**/?(*.)+(spec|test).[tj]s"], // default pattern
};

export default config;

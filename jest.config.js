export default  {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}
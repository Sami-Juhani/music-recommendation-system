import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, beforeEach, beforeAll, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { mockServer } from "./mockServer";

expect.extend(matchers);

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  require("dotenv").config();
});

afterEach(() => {
  cleanup();
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});

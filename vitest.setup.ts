import { vi } from "vitest";

// Mock better-auth globally to avoid database initialization errors during unit tests.
vi.mock("../../lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    }
  }
}));
vi.mock("../../../lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    }
  }
}));

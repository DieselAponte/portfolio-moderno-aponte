import { vi } from "vitest";

// Mock the centralized admin-auth module to avoid BetterAuth initialization during tests.
vi.mock("../../../lib/admin-auth", () => ({
  checkAdminAuth: vi.fn(),
}));
vi.mock("../../lib/admin-auth", () => ({
  checkAdminAuth: vi.fn(),
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { submitContactForm, type ContactFormState } from './contact.service';

vi.mock('@supabase/supabase-js', () => {
  let insertResult: { error: { message: string } | null } = { error: null };

  return {
    createClient: vi.fn(() => ({
      from: vi.fn(() => ({
        insert: vi.fn(() => Promise.resolve(insertResult)),
      })),
    })),
    __setInsertResult: (result: { error: null | { message: string } | null }) => {
      insertResult = result;
    },
  };
});

const initialState: ContactFormState = {
  success: false,
  error: null,
  fieldErrors: {},
};

const createFormData = (data: Record<string, string>): FormData => {
  const fd = new FormData();
  for (const [key, value] of Object.entries(data)) {
    fd.set(key, value);
  }
  return fd;
};

describe('Contact Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject empty service field', async () => {
    const formData = createFormData({
      service: '',
      email: 'test@example.com',
      project: 'This is a detailed project description for testing',
    });

    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.fieldErrors.service).toBeDefined();
  });

  it('should reject invalid email', async () => {
    const formData = createFormData({
      service: 'full-stack',
      email: 'invalid',
      project: 'This is a detailed project description for testing',
    });

    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.fieldErrors.email).toBeDefined();
  });

  it('should reject short project description', async () => {
    const formData = createFormData({
      service: 'full-stack',
      email: 'test@example.com',
      project: 'Short',
    });

    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.fieldErrors.project).toBeDefined();
  });

  it('should succeed with valid data', async () => {
    const formData = createFormData({
      service: 'full-stack',
      email: 'test@example.com',
      project: 'I need a full-stack web application with real-time features',
    });

    const result = await submitContactForm(initialState, formData);

    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
    expect(Object.keys(result.fieldErrors).length).toBe(0);
  });
});

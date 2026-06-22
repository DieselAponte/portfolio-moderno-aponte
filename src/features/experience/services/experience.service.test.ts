import { describe, it, expect, vi, beforeEach } from 'vitest';
import { redis } from '../../../lib/redis';

vi.mock('../../../lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    }
  }
}));

import { fetchModules, fetchSlides } from './experience.service';

vi.mock('../../../lib/redis', () => ({
  redis: {
    get: vi.fn(),
    setex: vi.fn(),
    keys: vi.fn(),
    del: vi.fn(),
  }
}));

vi.mock('@supabase/supabase-js', () => {
  const mockSelect = vi.fn().mockReturnThis();
  const mockOrder = vi.fn().mockReturnThis();
  const mockEq = vi.fn().mockReturnThis();

  const createMockQuery = (table: string) => {
    let mockData: Array<Record<string, unknown>> = [];
    if (table === 'experience_modules') {
        mockData = [{ id: 'mod-1', title: 'Module 1' }];
    } else if (table === 'experience_slides') {
        mockData = [{ id: 'slide-1', title: 'Slide 1' }];
    }

    const query = Promise.resolve({
      data: mockData,
      error: null
    });

    const finalQuery = Object.assign(query, {
      select: mockSelect,
      order: mockOrder,
      eq: mockEq
    });

    return finalQuery;
  };

  return {
    createClient: vi.fn(() => ({
      from: vi.fn((table: string) => createMockQuery(table))
    }))
  };
});

describe('Experience Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchModules should return cached data if available', async () => {
    const cachedData = [{ id: 'cached-mod-1', title: 'Cached Mod' }];
    vi.mocked(redis.get).mockResolvedValueOnce(JSON.stringify(cachedData));

    const result = await fetchModules();

    expect(redis.get).toHaveBeenCalled();
    expect(result).toEqual(cachedData);
  });

  it('fetchModules should fetch from Supabase if cache misses', async () => {
    vi.mocked(redis.get).mockResolvedValueOnce(null);

    const result = await fetchModules();

    expect(redis.get).toHaveBeenCalled();
    expect(redis.setex).toHaveBeenCalled();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('mod-1');
  });

  it('fetchSlides should return cached data if available', async () => {
    const cachedData = [{ id: 'cached-slide-1', title: 'Cached Slide' }];
    vi.mocked(redis.get).mockResolvedValueOnce(JSON.stringify(cachedData));

    const result = await fetchSlides();

    expect(redis.get).toHaveBeenCalled();
    expect(result).toEqual(cachedData);
  });

  it('fetchSlides should fetch from Supabase if cache misses', async () => {
    vi.mocked(redis.get).mockResolvedValueOnce(null);

    const result = await fetchSlides();

    expect(redis.get).toHaveBeenCalled();
    expect(redis.setex).toHaveBeenCalled();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('slide-1');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { redis } from '../../../lib/redis';

import { fetchCasesOfStudy, fetchHomeServices } from './home.service';

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

  const createMockQuery = (table: string) => {
    let mockData: Array<Record<string, unknown>> = [];
    if (table === 'home_services') {
      mockData = [{
        id: 'svc-1',
        title: 'Full-Stack Development',
        description: 'End-to-end web application development',
        highlights: ['React', 'Node.js', 'PostgreSQL'],
        order_index: 1
      }];
    } else if (table === 'home_cases_of_study') {
      mockData = [{
        id: 'case-1',
        title: 'Enterprise Dashboard',
        description: 'Real-time analytics platform for logistics',
        tags: ['React', 'D3.js'],
        order_index: 1
      }];
    }

    const query = Promise.resolve({
      data: mockData,
      error: null
    });

    return Object.assign(query, {
      select: mockSelect,
      order: mockOrder,
    });
  };

  return {
    createClient: vi.fn(() => ({
      from: vi.fn((table: string) => createMockQuery(table))
    }))
  };
});

describe('Home Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchHomeServices', () => {
    it('should return cached data if available', async () => {
      const cachedData = [{ id: 'cached-svc-1', title: 'Cached Service' }];
      vi.mocked(redis.get).mockResolvedValueOnce(JSON.stringify(cachedData));

      const result = await fetchHomeServices();

      expect(redis.get).toHaveBeenCalledWith('home_services');
      expect(result).toEqual(cachedData);
    });

    it('should fetch from Supabase if cache misses', async () => {
      vi.mocked(redis.get).mockResolvedValueOnce(null);

      const result = await fetchHomeServices();

      expect(redis.get).toHaveBeenCalledWith('home_services');
      expect(redis.setex).toHaveBeenCalledWith(
        'home_services',
        3600,
        expect.any(String)
      );
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('svc-1');
    });
  });

  describe('fetchCasesOfStudy', () => {
    it('should return cached data if available', async () => {
      const cachedData = [{ id: 'cached-case-1', title: 'Cached Case' }];
      vi.mocked(redis.get).mockResolvedValueOnce(JSON.stringify(cachedData));

      const result = await fetchCasesOfStudy();

      expect(redis.get).toHaveBeenCalledWith('home_cases_of_study');
      expect(result).toEqual(cachedData);
    });

    it('should fetch from Supabase if cache misses', async () => {
      vi.mocked(redis.get).mockResolvedValueOnce(null);

      const result = await fetchCasesOfStudy();

      expect(redis.get).toHaveBeenCalledWith('home_cases_of_study');
      expect(redis.setex).toHaveBeenCalledWith(
        'home_cases_of_study',
        3600,
        expect.any(String)
      );
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('case-1');
    });
  });
});

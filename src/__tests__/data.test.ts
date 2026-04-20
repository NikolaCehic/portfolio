import { describe, expect, it } from 'vitest';
import { DATA } from '../data';

describe('DATA', () => {
  it('has unique experience ids', () => {
    const ids = DATA.experience.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has at least one highlight per role', () => {
    for (const job of DATA.experience) {
      expect(job.highlights.length).toBeGreaterThan(0);
    }
  });

  it('has non-empty skills in every category', () => {
    for (const [, items] of Object.entries(DATA.skills)) {
      expect(items.length).toBeGreaterThan(0);
    }
  });

  it('has a linkedin URL that parses', () => {
    expect(() => new URL(DATA.linkedinUrl)).not.toThrow();
  });
});

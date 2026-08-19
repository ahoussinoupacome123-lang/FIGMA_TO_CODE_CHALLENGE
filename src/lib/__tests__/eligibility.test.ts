import { describe, it, expect } from 'vitest';
import { checkEligibility } from '../eligibility';

describe('checkEligibility', () => {
  it('returns not_eligible when underage', () => {
    const res = checkEligibility({ age: 17, weight: 60, gender: 'homme', lastDonationDate: null });
    expect(res.status).toBe('not_eligible');
    expect(res.reasons[0]).toContain('18');
  });

  it('returns not_eligible when overweight limit exceeded', () => {
    const res = checkEligibility({ age: 70, weight: 70, gender: 'homme', lastDonationDate: null });
    expect(res.status).toBe('not_eligible');
  });

  it('returns not_eligible when weight too low', () => {
    const res = checkEligibility({ age: 30, weight: 45, gender: 'femme', lastDonationDate: null });
    expect(res.status).toBe('not_eligible');
  });

  it('returns next_date when last donation too recent for male', () => {
    const last = new Date();
    last.setMonth(last.getMonth() - 1); // 1 month ago
    const res = checkEligibility({ age: 30, weight: 70, gender: 'homme', lastDonationDate: last.toISOString() });
    expect(res.status).toBe('next_date');
    expect(res.nextEligibleDate).not.toBeNull();
  });

  it('returns eligible for valid input', () => {
    const res = checkEligibility({ age: 30, weight: 70, gender: 'homme', lastDonationDate: null });
    expect(res.status).toBe('eligible');
  });
});

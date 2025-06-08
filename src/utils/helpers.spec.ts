import { describe, it, expect } from 'vitest';
import { firstLetterToUpperCase } from './helpers';

describe('firstLetterToUpperCase', () => {
  it('capitalizes the first letter of a lowercase word', () => {
    expect(firstLetterToUpperCase('regular')).toBe('Regular');
  });

  it('returns the same string if the first letter is already uppercase', () => {
    expect(firstLetterToUpperCase('Bold')).toBe('Bold');
  });

  it('handles single character strings', () => {
    expect(firstLetterToUpperCase('a')).toBe('A');
  });

  it('returns an empty string if input is empty', () => {
    expect(firstLetterToUpperCase('')).toBe('');
  });

  it('does not modify characters beyond the first', () => {
    expect(firstLetterToUpperCase('bOLD')).toBe('BOLD');
  });
});

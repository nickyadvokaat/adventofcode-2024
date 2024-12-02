import { describe, test, expect } from 'vitest';
import { getDistanceAndSimilarity } from "./day01";

const testData = [ '3   4', '4   3', '2   5', '1   3', '3   9', '3   3' ]

describe('Day01', () => {
    test('Calculates distance and similarity correctly', () => {
        expect(getDistanceAndSimilarity(testData)).toEqual({ distance: 11, similarity: 31})
    });
});
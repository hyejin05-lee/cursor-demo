import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractEmails, isValidEmail, getValidEmails, normalizeEmail } from './email.js';

test('extractEmails returns emails from members', () => {
  const members = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ];
  assert.deepEqual(extractEmails(members), [
    'alice@example.com',
    'bob@example.com',
  ]);
});

test('extractEmails returns empty array for non-array input', () => {
  assert.deepEqual(extractEmails(null), []);
  assert.deepEqual(extractEmails(undefined), []);
});

test('isValidEmail validates email format (RFC 5322)', () => {
  assert.equal(isValidEmail('alice@example.com'), true);
  assert.equal(isValidEmail('user+tag@example.com'), true);
  assert.equal(isValidEmail('invalid'), false);
  assert.equal(isValidEmail('bad-email'), false);
  assert.equal(isValidEmail(null), false);
  assert.equal(isValidEmail('a'.repeat(255)), false);
});

test('getValidEmails returns only valid emails', () => {
  const members = [
    { email: 'good@example.com' },
    { email: 'bad-email' },
    { email: 'also@good.org' },
    { email: null },
  ];
  assert.deepEqual(getValidEmails(members), [
    'good@example.com',
    'also@good.org',
  ]);
});

test('normalizeEmail trims whitespace and lowercases', () => {
  assert.equal(normalizeEmail('  Alice@Example.COM  '), 'alice@example.com');
  assert.equal(normalizeEmail('bob@example.com'), 'bob@example.com');
  assert.equal(normalizeEmail(null), '');
  assert.equal(normalizeEmail(undefined), '');
});

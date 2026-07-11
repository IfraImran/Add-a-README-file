import assert from "node:assert/strict";
import { validate } from "./validate.js";

let passed = 0;
function test(label, fn) {
  fn();
  passed++;
  console.log(`ok - ${label}`);
}

test("empty name is rejected", () => {
  const errors = validate({ name: "", email: "a@b.com", password: "" });
  assert.ok(errors.name);
});

test("whitespace-only name is rejected", () => {
  const errors = validate({ name: "   ", email: "a@b.com", password: "" });
  assert.ok(errors.name);
});

test("malformed email is rejected", () => {
  const errors = validate({ name: "Ada", email: "not-an-email", password: "" });
  assert.ok(errors.email);
});

test("short password is rejected", () => {
  const errors = validate({ name: "Ada", email: "a@b.com", password: "abc123" });
  assert.ok(errors.password);
});

test("blank password is allowed (means: keep current)", () => {
  const errors = validate({ name: "Ada", email: "a@b.com", password: "" });
  assert.equal(errors.password, undefined);
});

test("fully valid input passes with no errors", () => {
  const errors = validate({ name: "Ada Lovelace", email: "ada@example.com", password: "letmein1" });
  assert.deepEqual(errors, {});
});

console.log(`\n${passed}/6 tests passed`);

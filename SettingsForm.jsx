// Round 2 — built from a precise prompt referencing this file, stating
// constraints, example behavior, and a verification step:
//
// "Edit SettingsForm.jsx. Fields: name (required, 2-50 chars, trimmed),
//  email (required, valid format, case-insensitive dedupe on trim),
//  password (optional — only validate if the user types one: min 8 chars,
//  1 number, 1 letter), notify (checkbox). Every input needs a <label
//  htmlFor>, an id, and aria-describedby pointing at its error message
//  when invalid. Errors show inline, not via alert(). Disable the submit
//  button while saving and show 'Saving...'. Do not submit if validation
//  fails. After writing it, write SettingsForm.test.js covering: empty
//  name, bad email, short password, valid submit, and whitespace-only
//  name — then run the tests."

import { useState } from "react";
import { validate } from "./validate.js";

function SettingsForm({ onSave = async () => {} }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(true);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate({ name, email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      await onSave({ name: name.trim(), email: email.trim().toLowerCase(), password, notify });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="settings-name">Name</label>
        <input
          id="settings-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "settings-name-error" : undefined}
        />
        {errors.name && (
          <p id="settings-name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="settings-email">Email</label>
        <input
          id="settings-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "settings-email-error" : undefined}
        />
        {errors.email && (
          <p id="settings-email-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="settings-password">
          Password <span style={{ fontWeight: "normal" }}>(leave blank to keep current)</span>
        </label>
        <input
          id="settings-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "settings-password-error" : undefined}
        />
        {errors.password && (
          <p id="settings-password-error" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="settings-notify">
          <input
            id="settings-notify"
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
          Email notifications
        </label>
      </div>

      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

export default SettingsForm;

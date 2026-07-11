// Round 1 — built from a single vague prompt:
// "Build a settings form for the user account."
// Accepted the first output as-is, no follow-up, no tests.

import { useState } from "react";

function SettingsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Saved", { name, email, password, notify });
    alert("Settings saved!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
          Email notifications
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default SettingsForm;

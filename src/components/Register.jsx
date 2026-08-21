import { useState } from "react";
import "../App.css";

function Register({ onRegister }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

   if (response.ok) {

  const user = await response.json();

  alert("Registration successful");

  onRegister(user);

} else {

      alert("Registration failed");

    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
  Register
</button>

<p>
  Already have an account?{" "}
  <span
    className="register-link"
    onClick={onRegister}
  >
    Login
  </span>
</p>

      
    </div>
  );
}

export default Register;
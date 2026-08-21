import { useState } from "react";
import "../App.css";

function Login({ onLogin, onRegister })  {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (response.ok) {

      const user = await response.json();

      onLogin(user);

    } else {

      alert("Invalid email or password");

    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

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

      <button onClick={handleLogin}>
  Login
</button>

<p>
  New user?{" "}
  <span
    onClick={onRegister}
    style={{ color: "blue", cursor: "pointer" }}
  >
    Register
  </span>
</p>
    </div>
  );
}

export default Login;

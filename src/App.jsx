import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import './App.css';
function App() {

  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (user !== null) {
    return <Dashboard
  userId={user.id}
  onLogout={() => setUser(null)}
/>;
  }

  if (showRegister) {
    return (
     <Register
  onRegister={(user) => setUser(user)}
/>
    );
  }

  return (
    <Login
      onLogin={setUser}
      onRegister={() => setShowRegister(true)}
    />
  );
}

export default App;
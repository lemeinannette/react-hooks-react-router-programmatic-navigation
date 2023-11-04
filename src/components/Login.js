import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch, useHistory } from "react-router-dom";

// Mock user data and authentication status
const fakeUserData = {
  username: "user123",
  password: "password123",
};

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  // Function to handle login
  const handleLogin = () => {
    setUser(fakeUserData);
    history.push("/home");
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    history.push("/login");
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/home">
            {user ? (
              <Home isSignedIn={true} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            {user ? (
              <Redirect to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home({ isSignedIn }) {
  if (!isSignedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Home Page</h1>
      {/* Your home page content here */}
    </div>
  );
}

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === fakeUserData.username && formData.password === fakeUserData.password) {
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default App;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../context/ApiContext.jsx";
import axios from "axios";

const SignupPage = () => {
  const { setUser } = useContext(ApiContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyData = {
      firstName,
      lastName,
      username,
      email,
      password
    };
    setError("");
    const res = await axios(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, {
      method: "POST",
      data: bodyData
    });

    console.log(res);
    if (res.data.status == true) {
      // User created successfully
      setUser(res.data.user);
      navigate("/login");
    } else {
      // Handle error
      setError(res.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 p-2 mb-3 border rounded-lg"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 p-2 mb-3 border rounded-lg"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Sign Up
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

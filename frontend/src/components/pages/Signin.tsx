import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

interface LoginResponse {
  token: string;
  message: string;
  user: {
    id: number;
    email: string;
  };
}

export function Signin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleClick() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-sm space-y-4 mt-40 h-80"
      style={{
        "border": "2px solid black",
        "borderRadius": "10px",
        // bhul gye border or border radius kaise likhte tailwind me (aap search to krne nhi dete :) )
        "backgroundColor": "#e9e9e9"
      }}
    >
      <h1 className="text-2xl font-semibold ml-40 mt-10">Login</h1>

      <input
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        placeholder="Email"
        className=" rounded border p-2 w-80 ml-8"
        style={{
          "border": "1px solid black",
          "backgroundColor": "#ededed"
        }}
      />

      <input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="Password"
        className="rounded border p-2 w-80 ml-8"
        style={{
          "border": "1px solid black",
          "backgroundColor": "#ededed"
        }}
      />
      <br />
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer w-50 ml-20"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {errorMessage ? <p className="text-sm text-red-600 ml-10">{errorMessage}</p> : null}
    </section>
  );
}
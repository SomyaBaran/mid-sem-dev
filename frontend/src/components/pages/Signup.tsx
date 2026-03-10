// url : http://localhost:3000/signup

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

interface SignupResponse {
  token: string;
  message: string;
  user: {
    id: number;
    email: string;
  };
}

export function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleClick() {
    if (password !== confirmPassword) {
      setErrorMsg("password does not match")
    }

    setIsLoading(true);
    setErrorMsg("");

    try{
      const response = await apiClient.post<SignupResponse>("/auth/signup", {
        email,
        password
      });

      localStorage.setItems("token", response.data.token);
      navigate("/");
    }
    catch{
      setErrorMsg("Signup failed please try again");
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <section
      className="mx-auto max-w-sm space-y-4 mt-40 h-96"
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        backgroundColor: "#e9e9e9",
      }}
    >
      <h1 className="text-2xl font-semibold ml-40 mt-10">Sign Up</h1>

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="rounded border p-2 w-80 ml-8"
        style={{
          border: "1px solid black",
          backgroundColor: "#ededed",
        }}
      />

      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="rounded border p-2 w-80 ml-8"
        style={{
          border: "1px solid black",
          backgroundColor: "#ededed",
        }}
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        className="rounded border p-2 w-80 ml-8"
        style={{
          border: "1px solid black",
          backgroundColor: "#ededed",
        }}
      />

      <br />
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer w-50 ml-20"
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>

      {errorMsg ? <p className="text-sm text-red-600 ml-10">{errorMsg}</p> : null}
    </section>
  );
}
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Ring from "../components/loaders/Ring";

const Register = () => {
  const navigate = useNavigate();
  const state = useSelector((store: any) => store.account.userProfile);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const body = { email, password, username, name };
      const response = await axios.post("/api/users/register", body, {
        withCredentials: true,
      });

      console.log("response");

      if (response.status !== 201) {
        throw new Error(response.data?.error);
      }

      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status) {
        window.location.href = "/";
      }
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="flex min-h-[100vh] justify-center bg-black py-12">
      <form className="flex w-[30%] flex-col items-center justify-center gap-6 sm:w-[90%] md:w-[50%] xs:w-[90%]">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="enter name"
          className="w-[100%] rounded-md border border-white bg-black p-4 px-6 font-medium text-white"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="@username"
          className="w-[100%] rounded-md border border-white bg-black p-4 px-6 font-medium text-white"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email"
          className="w-[100%] rounded-md border border-white bg-black p-4 px-6 font-medium text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter password"
          className="w-[100%] rounded-md border border-white bg-black p-4 px-6 font-medium text-white"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
          className="w-[100%] rounded-md border border-white bg-black p-4 px-6 font-medium text-white"
        />
        <p className="font-mono text-white">{error}</p>
        <button
          onClick={registerUser}
          className={`rounded-md border border-white bg-black p-4 px-32 text-center font-bold text-white ${
            !loading && "hover:bg-white hover:text-black"
          } w-[100%] transition-colors duration-300`}
          disabled={loading}
        >
          {loading ? <Ring size={22} /> : <> Register </>}
        </button>

        <Link to="/login" className="italic text-white hover:underline">
          Already a user? Login here.
        </Link>
      </form>
    </div>
  );
};

export default Register;

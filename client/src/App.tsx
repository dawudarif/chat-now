import { Route, Routes } from "react-router-dom";
import Ring from "./components/loaders/Ring";
import { Suspense, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./features/account";
import "./index.css";
import { io } from "socket.io-client";

const Fallback = () => (
  <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-6 bg-black">
    <Ring size={50} />
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile() as any);
  }, []);

  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

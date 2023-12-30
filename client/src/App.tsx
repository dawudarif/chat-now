import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Ring from "./components/loaders/Ring";
import { fetchUserProfile } from "./features/account";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Fallback = () => (
  <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-6 bg-black">
    <Ring size={50} />
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile() as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

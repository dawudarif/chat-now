import { useSelector } from "react-redux";
import Wrapper from "../components/Home/Wrapper";

const Home = () => {
  const state = useSelector((store: any) => store.account.userProfile);

  return (
    <>
      {state ? (
        <Wrapper />
      ) : (
        <div className="flex min-h-[100vh] items-center justify-center bg-black">
          <button className="rounded-xl bg-white p-6 font-mono text-lg font-bold transition-colors duration-500 hover:bg-[#252525]">
            Login to continue
          </button>
        </div>
      )}
    </>
  );
};

export default Home;

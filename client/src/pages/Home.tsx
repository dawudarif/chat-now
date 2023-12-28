import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../components/Home/Wrapper";
import { useEffect } from "react";
import { socket } from "../socket";
import { addNewConversation } from "../features/conversation";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: any) => store.account.userProfile);

  useEffect(() => {
    if (!state?.id) return;
    socket.emit("join_user", state.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, socket]);

  useEffect(() => {
    socket.on("receive-new-conversation", (conversation) => {
      dispatch(addNewConversation(conversation));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <>
      {state ? (
        <Wrapper />
      ) : (
        <div className="flex min-h-[100vh] items-center justify-center bg-black">
          <button className="rounded-3xl bg-white p-6 font-mono text-lg font-bold transition-colors duration-500 hover:bg-[#252525]">
            Login to continue
          </button>
        </div>
      )}
    </>
  );
};

export default Home;

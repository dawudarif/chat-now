import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../components/Home/Wrapper";
import {
  addNewConversation,
  updateMessageInConversation,
} from "../features/conversation";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: any) => store.account.userProfile);

  useEffect(() => {
    if (!state?.id) return;
    socket.emit("join_user", state.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.id, socket]);

  useEffect(() => {
    if (!state?.id) return;
    socket.on("receive-new-conversation", (conversation) => {
      dispatch(addNewConversation(conversation));
    });

    socket.on("update-conversation", (message) => {
      dispatch(updateMessageInConversation({ message, userId: state?.id }));
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

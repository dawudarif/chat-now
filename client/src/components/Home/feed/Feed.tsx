import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversationState } from "../../../features/conversation";
import useSearchUsername from "../../../hooks/useSearchUsername";
import SingleConversationItem from "./SingleConversationItem";
import SingleSearchItem from "./SingleSearchItem";
import { IFeedItem } from "../../../types/types";
import { useSearchParams } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";

const Feed = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [search, setSearch] = useState("");
  const { results } = useSearchUsername(search);

  const dispatch = useDispatch();
  const state = useSelector((store: any) => store.account.userProfile);
  const conversationsState = useSelector(
    (store: any) => store.conversation.conversations,
  );

  const logoutUser = async () => {
    await axios.get("api/users/logout", { withCredentials: true });
    window.location.href = "/login";
  };

  const getConversations = async () => {
    try {
      const response = await axios.get("/api/conversations/all", {
        withCredentials: true,
      });

      dispatch(setConversationState(response.data));
    } catch (error) {
      toast.error("There was an error fetching conversations.");
    }
  };

  useEffect(() => {
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`flex ${
        id ? "sm:hidden md:hidden xs:hidden" : "sm:w-full md:w-full xs:w-full"
      } relative h-[100vh] w-[25%] flex-col bg-black text-white`}
    >
      <input
        type="text"
        placeholder="Search username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="m-2 rounded-lg border-2 border-[#252525] bg-transparent p-3 font-mono outline-offset-2 active:ring-black active:ring-transparent"
      />
      <div>
        {search === ""
          ? conversationsState.map((item: IFeedItem) => {
              const participant = item.participants.find((p) => {
                return p.userId === state?.id;
              });

              return (
                <SingleConversationItem
                  hasSeenLatestMessage={participant?.hasSeenLatestMessage!}
                  data={item}
                  key={item.id}
                  chats={conversationsState}
                  setChats={(chats) => dispatch(setConversationState(chats))}
                />
              );
            })
          : results.map((item) => (
              <SingleSearchItem
                data={item}
                key={item.id}
                chats={conversationsState}
                setChats={(chats) => dispatch(setConversationState(chats))}
                setSearch={(search) => setSearch(search)}
              />
            ))}
      </div>

      <div
        className="absolute bottom-3 left-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#252525] text-xl font-bold uppercase text-white transition-all duration-500 hover:scale-110"
        onClick={() => logoutUser()}
      >
        <CiLogout size={30} color="white" />
      </div>
    </div>
  );
};

export default Feed;

import axios from "axios";
import { useEffect, useState } from "react";
import useSearchUsername from "../../../hooks/useSearchUsername";
import { IChat, ISearchResult } from "../../../types/types";
import SingleSearchItem from "./SingleSearchItem";
import SingleConversationItem from "./SingleConversationItem";
import { useSelector } from "react-redux";

const Feed = () => {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState<Array<IChat>>([]);
  const { results } = useSearchUsername(search);
  const state = useSelector((store: any) => store.account.userProfile);

  const getConversations = async () => {
    try {
      const response = await axios.get("/api/conversations/all", {
        withCredentials: true,
      });

      console.log(response.data);
      setChats(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="flex h-[100vh] w-[25%] flex-col bg-black text-white">
      <input
        type="text"
        placeholder="Search username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="m-2 rounded-lg border-2 border-[#252525] bg-transparent p-3 font-mono outline-offset-2 active:ring-black active:ring-transparent"
      />
      <div>
        {search === ""
          ? chats.map((item) => {
              const participant = item.participants.find((p) => {
                return p.userId === state?.id;
              });

              return (
                <SingleConversationItem
                  hasSeenLatestMessage={!participant?.hasSeenLatestMessage}
                  data={item}
                  key={item.id}
                />
              );
            })
          : results.map((item) => (
              <SingleSearchItem
                data={item}
                key={item.id}
                chats={chats}
                setChats={(chats) => setChats(chats)}
                setSearch={(search) => setSearch(search)}
              />
            ))}
      </div>
    </div>
  );
};

export default Feed;

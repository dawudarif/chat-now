import axios from "axios";
import { useEffect, useState } from "react";
import useSearchUsername from "../../../hooks/useSearchUsername";
import { IChat } from "../../../types/types";
import SingleSearchItem from "./SingleSearchItem";
import SingleConversationItem from "./SingleConversationItem";

const Feed = () => {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState<Array<IChat>>([]);
  const { results } = useSearchUsername(search);

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
          ? chats.map((item) => (
              <SingleConversationItem data={item} key={item.id} />
            ))
          : results.map((item) => (
              <SingleSearchItem data={item} key={item.id} />
            ))}
      </div>
    </div>
  );
};

export default Feed;

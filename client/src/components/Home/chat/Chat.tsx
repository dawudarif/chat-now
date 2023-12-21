import { useSearchParams } from "react-router-dom";
import ConversationHeader from "./ConversationHeader";
import MessageInput from "./MessageInput";
import ChatBody from "./ChatBody";
import axios from "axios";
import { useEffect } from "react";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const username = searchParams.get("username");
  const id = searchParams.get("id");

  if (!id && !name) {
    return (
      <div className=" flex h-[100vh] w-[75%] items-center justify-center border-l-2 border-[#252525] bg-black text-white">
        <h4 className="font-mono text-xl text-[#383838]">
          Select a chat from menu to view here
        </h4>
      </div>
    );
  }

  return (
    <div className="flex h-[100vh] w-[75%] flex-col border-l-2 border-[#252525] bg-black text-white">
      <ConversationHeader name={name!} username={username!} />
      <ChatBody conversationId={id!} />
      <MessageInput conversationId={id!} />
    </div>
  );
};

export default Chat;

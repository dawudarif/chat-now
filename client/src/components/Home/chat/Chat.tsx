import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../../socket";
import ChatBody from "./ChatBody";
import ConversationHeader from "./ConversationHeader";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const username = searchParams.get("username");
  const conversationId = searchParams.get("id");

  const conversations = useSelector(
    (store: any) => store.conversation.conversations,
  );

  useEffect(() => {
    if (!conversationId) return;
    socket.emit("join_conversation", conversationId);
  }, [conversationId, socket]);

  if (!conversationId && !name) {
    return (
      <div
        className={`${
          conversationId
            ? "sm:w-full md:w-full xs:w-full"
            : "sm:hidden md:hidden xs:hidden"
        }  md:full xs:full sm:full flex h-[100vh] w-[75%] items-center justify-center border-l-2 border-[#252525] bg-black text-white`}
      >
        <h4 className="font-mono text-xl text-[#383838]">
          Select a chat from menu to view here
        </h4>
      </div>
    );
  }

  return (
    <div
      className={`flex ${
        conversationId
          ? "sm:w-full md:w-full xs:w-full"
          : "sm:hidden md:hidden xs:hidden"
      } h-[100vh] w-[75%] flex-col border-l-2 border-[#252525] bg-black text-white `}
    >
      <ConversationHeader name={name!} username={username!} />
      <ChatBody conversationId={conversationId!} />
      <MessageInput
        conversationId={conversationId!}
        conversations={conversations}
      />
    </div>
  );
};

export default Chat;

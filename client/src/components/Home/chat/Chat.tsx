import ConversationHeader from "./ConversationHeader";
import MessageInput from "./MessageInput";

const Chat = () => {
  return (
    <div className="relative flex h-[100vh] w-[75%] flex-col border-l-2 border-[#252525] bg-black text-white">
      <ConversationHeader />
      <div>chat</div>
      <MessageInput />
    </div>
  );
};

export default Chat;

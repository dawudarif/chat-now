import axios from "axios";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { v4 as uuid } from "uuid";

interface MessageInputProps {
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ conversationId }) => {
  const [MessageInput, setMessageInput] = useState("");

  const sendMessage = async () => {
    const generateId = uuid();

    console.log(generateId);

    const body = {
      conversationId,
      messageId: generateId,
      body: "Dawood",
    };
    try {
      const response = await axios.post("/api/message/send", body, {
        withCredentials: true,
      });

      console.log(response.data);

      if (response.data.messageId === generateId) {
        console.log(true);
      }
    } catch (error) {}
  };

  return (
    <div className="fixed bottom-0 flex w-full items-center border-t-2 border-[#252525] p-2">
      <input
        type="text"
        placeholder="Enter a message"
        value={MessageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="m-2 w-[68%] rounded-lg border-2 border-[#252525] bg-transparent p-3 font-mono"
      />
      <button
        className="m-2 w-[5rem] rounded-lg bg-transparent p-3 hover:bg-[#252525]"
        onClick={() => sendMessage()}
      >
        <IoSend size={30} />
      </button>
    </div>
  );
};

export default MessageInput;

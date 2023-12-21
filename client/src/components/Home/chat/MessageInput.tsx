import axios from "axios";
import { FormEvent, useState } from "react";
import { IoSend } from "react-icons/io5";
import { v4 as uuid } from "uuid";

interface MessageInputProps {
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ conversationId }) => {
  const [messageInput, setMessageInput] = useState("");

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const generateId = uuid();

    const body = {
      conversationId,
      messageId: generateId,
      body: messageInput,
    };
    try {
      const response = await axios.post("/api/message/send", body, {
        withCredentials: true,
      });

      console.log(response.data);

      if (response.data.messageId === generateId && response.status === 200) {
        setMessageInput("");
        console.log(true);
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={sendMessage}
      className="flex h-[13%] w-full items-center border-t-2 border-[#252525] bg-inherit p-2"
    >
      <input
        type="text"
        placeholder="Enter a message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="m-2 w-[95%] rounded-lg border-2 border-[#252525] bg-inherit p-3 font-mono"
      />
      <button
        className="m-2 w-[5%] rounded-lg bg-transparent p-3 hover:bg-[#252525]"
        type="submit"
      >
        <IoSend size={30} />
      </button>
    </form>
  );
};

export default MessageInput;

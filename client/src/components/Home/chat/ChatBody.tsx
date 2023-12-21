import axios from "axios";
import { useEffect, useState } from "react";
import { IMessage } from "../../../types/types";
import { useSelector } from "react-redux";
import SingleMessage from "./SingleMessage";

interface ChatBodyProps {
  conversationId: string;
}

const ChatBody: React.FC<ChatBodyProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const state = useSelector((store: any) => store.account.userProfile);

  const getMessages = async () => {
    try {
      const response = await axios.get("/api/message/get-messages", {
        params: {
          conversationId: conversationId,
        },
        withCredentials: true,
      });

      console.log(response.data);
      setMessages(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return (
    <div className="mb-24 h-max overflow-x-hidden overflow-y-scroll">
      {messages.map((message: IMessage) => {
        const sentByMe = message.senderId === state?.id;
        return (
          <SingleMessage
            key={message.id}
            message={message}
            sentByMe={sentByMe}
          />
        );
      })}
    </div>
  );
};
export default ChatBody;

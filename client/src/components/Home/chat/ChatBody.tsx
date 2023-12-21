import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMessage } from "../../../types/types";
import SingleMessage from "./SingleMessage";

interface ChatBodyProps {
  conversationId: string;
}

const ChatBody: React.FC<ChatBodyProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [loading, setLoading] = useState(false);
  const state = useSelector((store: any) => store.account.userProfile);

  const getMessages = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  return (
    <div className="hide-scrollbar flex h-[75%] flex-col-reverse overflow-y-auto">
      {loading ? (
        <p>loading</p>
      ) : (
        messages.map((message: IMessage) => {
          const sentByMe = message.senderId === state?.id;
          return (
            <SingleMessage
              key={message.id}
              message={message}
              sentByMe={sentByMe}
            />
          );
        })
      )}
    </div>
  );
};
export default ChatBody;

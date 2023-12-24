import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessagesState } from "../../../features/messages";
import { socket } from "../../../socket";
import { IMessage } from "../../../types/types";
import Ring from "../../loaders/Ring";
import SingleMessage from "./SingleMessage";

interface ChatBodyProps {
  conversationId: string;
}

const ChatBody: React.FC<ChatBodyProps> = ({ conversationId }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((store: any) => store.account.userProfile);
  const messagesState = useSelector((store: any) => store.message.messages);

  const getMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/message/get-messages", {
        params: {
          conversationId: conversationId,
        },
        withCredentials: true,
      });

      dispatch(setMessagesState(response.data));
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

  useEffect(() => {
    console.log(messagesState);

    socket.on("receive_message", (message: IMessage) => {
      dispatch(setMessagesState([message, ...messagesState]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="hide-scrollbar duration-00 flex h-[75%] flex-col-reverse overflow-y-auto transition-all">
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <Ring size={30} />
        </div>
      ) : (
        messagesState.map((message: IMessage, i: number) => {
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

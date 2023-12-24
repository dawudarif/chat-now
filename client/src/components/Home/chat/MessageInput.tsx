import axios from "axios";
import { FormEvent, useState } from "react";
import { IoSend } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import { socket } from "../../../socket";
import { IFeedItem, IMessage, IParticipant } from "../../../types/types";
import { setMessagesState } from "../../../features/messages";
import { useDispatch, useSelector } from "react-redux";
import { setConversationState } from "../../../features/conversation";

interface MessageInputProps {
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ conversationId }) => {
  const [messageInput, setMessageInput] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((store: any) => store.account.userProfile);
  const messagesState = useSelector((store: any) => store.message.messages);
  const conversationsState = useSelector(
    (store: any) => store.conversation.conversations,
  );

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

      const newMessage = response.data as IMessage;

      if (response.data.id === generateId && response.status === 200) {
        setMessageInput("");

        await socket.emit("send_message", response.data);

        const filterConversation = conversationsState.map((item: IFeedItem) => {
          if (item.id === response.data.conversationId) {
            const newParticipants = item.participants.map(
              (participant: IParticipant) => {
                if (participant.userId === state.id) {
                  return { ...participant, hasSeenLatestMessage: true };
                }
                return participant;
              },
            );

            return {
              ...item,
              latestMessage: { body: newMessage.body },
              latestMessageId: newMessage.id,
              participants: newParticipants,
            };
          }
          return item;
        });
        dispatch(setConversationState(filterConversation));
        dispatch(setMessagesState([response.data, ...messagesState]));
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

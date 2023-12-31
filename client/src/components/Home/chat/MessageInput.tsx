import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { setConversationState } from "../../../features/conversation";
import { setMessagesState } from "../../../features/messages";
import { socket } from "../../../socket";
import { IFeedItem, IParticipant } from "../../../types/types";

interface MessageInputProps {
  conversationId: string;
  conversations: Array<IFeedItem>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  conversationId,
  conversations,
}) => {
  const [messageInput, setMessageInput] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((store: any) => store.account.userProfile);
  const messagesState = useSelector((store: any) => store.message.messages);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state) return;
    const initialConversations = [...conversations];
    const initialMessages = [...messagesState];
    const generateId = uuid();

    const reqBody = {
      conversationId,
      messageId: generateId,
      body: messageInput,
    };

    const sendMessage = {
      id: generateId,
      conversationId,
      body: reqBody.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      senderId: state?.id,
      sender: {
        id: state?.id,
        name: state?.name,
        username: state?.username,
      },
    };

    const filterConversation = conversations.map((item: IFeedItem) => {
      if (item.id === conversationId) {
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
          latestMessage: { body: reqBody.body },
          latestMessageId: reqBody.messageId,
          participants: newParticipants,
        };
      }
      return item;
    });

    dispatch(setConversationState(filterConversation));
    dispatch(setMessagesState([sendMessage, ...messagesState]));
    setMessageInput("");

    try {
      const response = await axios.post("/api/message/send", reqBody, {
        withCredentials: true,
      });

      if (response.data.id === generateId && response.status === 200) {
        dispatch(setMessagesState([response.data, ...messagesState]));
        await socket.emit("send_message", response.data);
      }
    } catch (error) {
      toast.error("There was an error sending message.");
      dispatch(setConversationState(initialConversations));
      dispatch(setMessagesState(initialMessages));
    }
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

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IFeedItem, IParticipant } from "../../../types/types";
import axios from "axios";

interface SingleConversationItemProps {
  data: IFeedItem;
  hasSeenLatestMessage: boolean;
  setChats: (chats: Array<IFeedItem>) => void;
  chats: Array<IFeedItem>;
}

const SingleConversationItem: React.FC<SingleConversationItemProps> = ({
  data,
  hasSeenLatestMessage,
  setChats,
  chats,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchId = searchParams.get("id");
  const state = useSelector((store: any) => store.account.userProfile);
  const otherUser = data.participants.find(
    (item: IParticipant) => item.userId !== state.id,
  );

  const setConversationStatus = async () => {
    try {
      const response = await axios.post(
        "/api/conversations/mark-read",
        {
          conversationId: data.id,
        },
        { withCredentials: true },
      );

      console.log(response.data);
    } catch (error) {}
  };

  const navigateToChat = async () => {
    if (!hasSeenLatestMessage) {
      const updatedData = {
        ...data,
        participants: data.participants.map((participant: IParticipant) => {
          if (participant.userId === state.id) {
            return { ...participant, hasSeenLatestMessage: true };
          }
          return participant;
        }),
      };

      const updatedChats = chats.map((chat: IFeedItem) => {
        if (chat.id === updatedData.id) {
          return { ...chat, ...updatedData };
        }
        return chat;
      });

      setChats(updatedChats);
    }

    setConversationStatus();

    navigate(
      `/?id=${data.id}&name=${otherUser?.user.name}&username=${otherUser?.user.username}`,
    );
  };

  return (
    <div
      className={`relative flex cursor-pointer items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e] ${
        searchId === data.id && "bg-[#1c1c1e]"
      }`}
      key={data.id}
      onClick={() => navigateToChat()}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold uppercase text-white">
        {otherUser?.user.name.slice(0, 2)}
      </div>
      <div>
        <h4>{otherUser?.user.username}</h4>
        <p>{data.latestMessage?.body}</p>
      </div>

      {!hasSeenLatestMessage && (
        <div className="absolute right-5 h-3 w-3 rounded-full bg-blue-600"></div>
      )}
    </div>
  );
};

export default SingleConversationItem;

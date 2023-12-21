import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IFeedItem, IParticipant } from "../../../types/types";

interface SingleConversationItemProps {
  data: IFeedItem;
  hasSeenLatestMessage: boolean;
}

const SingleConversationItem: React.FC<SingleConversationItemProps> = ({
  data,
  hasSeenLatestMessage,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchId = searchParams.get("id");
  const state = useSelector((store: any) => store.account.userProfile);
  const otherUser = data.participants.find(
    (item: IParticipant) => item.userId !== state.id,
  );

  console.log(otherUser);

  return (
    <div
      className={`relative flex items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e] ${
        searchId === data.id && "bg-[#1c1c1e]"
      }`}
      key={data.id}
      onClick={() =>
        navigate(
          `/?id=${data.id}&name=${otherUser?.user.name}&username=${otherUser?.user.username}&read=${hasSeenLatestMessage}`,
        )
      }
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold uppercase text-white">
        {otherUser?.user.name.slice(0, 2)}
      </div>
      <div className="capitalize">{otherUser?.user.username}</div>
    </div>
  );
};

export default SingleConversationItem;

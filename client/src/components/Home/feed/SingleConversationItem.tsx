import React from "react";
import { IChat } from "../../../types/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface SingleConversationItemProps {
  data: IChat;
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
  const otherUser = data.participants.find((item) => item.userId !== state.id);

  return (
    <div
      className={`relative flex items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e] ${
        searchId === data.id && "bg-[#1c1c1e]"
      }`}
      key={data.id}
      onClick={() =>
        navigate(
          `/?id=${data.id}&name=${otherUser?.user.name}&read=${hasSeenLatestMessage}`,
        )
      }
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold uppercase text-white">
        {data.participants[0].user.name.slice(0, 1)}
      </div>
      <div className="capitalize">{data.participants[1].user.name}</div>
    </div>
  );
};

export default SingleConversationItem;

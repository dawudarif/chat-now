import React from "react";
import { IChat } from "../../../types/types";

interface SingleConversationItemProps {
  data: IChat;
}

const SingleConversationItem: React.FC<SingleConversationItemProps> = ({
  data,
}) => {
  return (
    <div
      className="flex items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e]"
      key={data.id}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold text-white">
        {data.participants[0].user.name.slice(0, 1)}
      </div>
      <div>{data.participants[0].user.name}</div>
    </div>
  );
};

export default SingleConversationItem;

import React from "react";
import { IChat } from "../../../types/types";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SingleConversationItemProps {
  data: IChat;
}

const SingleConversationItem: React.FC<SingleConversationItemProps> = ({
  data,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchId = searchParams.get("id");

  return (
    <div
      className={`flex items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e] ${
        searchId === data.id && "bg-[#1c1c1e]"
      }`}
      key={data.id}
      onClick={() =>
        navigate(`/?id=${data.id}&name=${data.participants[1].user.name}`)
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

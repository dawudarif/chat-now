import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IFeedItem, IParticipant, ISearchResult } from "../../../types/types";
import { socket } from "../../../socket";

interface SingleSearchItemProps {
  data: ISearchResult;
  chats: Array<IFeedItem>;
  setChats: (chats: Array<IFeedItem>) => void;
  setSearch: (search: string) => void;
}

const SingleSearchItem: React.FC<SingleSearchItemProps> = ({
  data,
  chats,
  setChats,
  setSearch,
}) => {
  const navigate = useNavigate();
  const state = useSelector((store: any) => store.account.userProfile);

  const createConversation = async (id: string) => {
    const initialChats = [...chats];
    const generateId = uuidv4();
    const body = {
      id,
      conversationId: generateId,
    };

    try {
      const response = await axios.post("api/conversations/create", body, {
        withCredentials: true,
      });

      const chatName = response.data.participants.find(
        (item: IParticipant) => item.userId !== state.id,
      );

      if (response.status === 200) {
        navigate(
          `/?id=${response.data.id}&name=${chatName.user.name}&username=${chatName.user.username}`,
        );
      } else {
        setChats([response.data, ...initialChats]);
        await socket.emit("create-conversation", response.data);
        navigate(
          `/?id=${response.data.id}&name=${chatName.user.name}&username=${chatName.user.username}`,
        );
      }
    } catch (error) {
    } finally {
      setSearch("");
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e]"
      key={data.id}
      onDoubleClick={() => createConversation(data.id)}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold uppercase text-white">
        {data.name.slice(0, 2)}
      </div>
      <h4>{data.username}</h4>
    </div>
  );
};

export default SingleSearchItem;

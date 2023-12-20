import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { IChat, IParticipant, ISearchResult } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface SingleSearchItemProps {
  data: ISearchResult;
  chats: Array<IChat>;
  setChats: (chats: Array<IChat>) => void;
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

      console.log(response.data);

      if (response.status === 200) {
        navigate(`/?id=${response.data.id}&name=${chatName.user.name}`);
      } else {
        setChats([response.data, ...initialChats]);
        navigate(`/?id=${response.data.id}&name=${chatName.user.name}`);
      }
    } catch (error) {
    } finally {
      setSearch("");
    }
  };

  return (
    <div
      className="flex items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e]"
      key={data.id}
      onDoubleClick={() => createConversation(data.id)}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold uppercase text-white">
        {data.name.slice(0, 1)}
      </div>
      <h4>{data.name}</h4>
    </div>
  );
};

export default SingleSearchItem;

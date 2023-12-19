import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { IChat, ISearchResult } from "../../../types/types";
import { useNavigate } from "react-router-dom";

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

      if (response.status === 200) {
        navigate(
          `/?id=${response.data.conversationId}&name=${response.data.name}`,
        );
      } else {
        setChats([response.data, ...initialChats]);
        navigate("/");
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

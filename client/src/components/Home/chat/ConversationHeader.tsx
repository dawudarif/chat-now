import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ConversationHeader = ({ name }: { name?: string | null }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center gap-4 border-b-2 border-[#252525] p-4">
      <div
        className="rounded-lg bg-transparent p-1 hover:bg-[#252525]"
        onClick={() => navigate("/")}
      >
        <IoIosArrowBack size={30} />
      </div>
      <h4 className="font-sans text-[1.1rem] font-semibold capitalize">
        {name ? name : "null"}
      </h4>
    </div>
  );
};

export default ConversationHeader;

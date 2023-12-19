import { IoIosArrowBack } from "react-icons/io";

const ConversationHeader = () => {
  return (
    <div className="flex w-full items-center gap-4 border-b-2 border-[#252525] p-4">
      <div className="rounded-lg bg-transparent p-1 hover:bg-[#252525]">
        <IoIosArrowBack size={30} />
      </div>
      <h4 className="font-sans text-[1.1rem] font-semibold">Dawood Arif</h4>
    </div>
  );
};

export default ConversationHeader;

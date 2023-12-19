import { IoSend } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

const Chat = () => {
  return (
    <div className="relative flex h-[100vh] w-[75%] flex-col border-l-2 border-[#252525] bg-black text-white">
      <div className="flex w-full items-center gap-4 border-b-2 border-[#252525] p-4">
        <div className="rounded-lg bg-transparent p-1 hover:bg-[#252525]">
          <IoIosArrowBack size={30} />
        </div>
        <h4 className="font-sans text-[1.1rem] font-semibold">Dawood Arif</h4>
      </div>
      <div>chat</div>
      <div className="fixed bottom-0 flex w-full items-center border-t-2 border-[#252525] p-2">
        <input
          type="text"
          placeholder="Enter a message"
          className="m-2 w-[68%] rounded-lg border-2 border-[#252525] bg-transparent p-3 font-mono"
        />
        <button className="m-2 w-[5rem] rounded-lg bg-transparent p-3 hover:bg-[#252525]">
          <IoSend size={30} />
        </button>
      </div>
    </div>
  );
};

export default Chat;

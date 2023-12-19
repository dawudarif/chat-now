import { IoSend } from "react-icons/io5";

const MessageInput = () => {
  return (
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
  );
};

export default MessageInput;

import Chat from "./chat/Chat";
import Feed from "./feed/Feed";

const Wrapper = () => {
  return (
    <div className="flex">
      <Feed />
      <Chat />
    </div>
  );
};

export default Wrapper;

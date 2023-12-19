import { useState } from "react";
import useSearchUsername from "../../../hooks/useSearchUsername";

const Feed = () => {
  const [search, setSearch] = useState("");
  const { results } = useSearchUsername(search);

  return (
    <div className="flex h-[100vh] w-[25%] flex-col bg-black text-white">
      <input
        type="text"
        placeholder="Search username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="m-2 rounded-lg border-2 border-[#252525] bg-transparent p-3 font-mono outline-offset-2 active:ring-black active:ring-transparent"
      />
      <div>
        {results.map((item) => (
          <div
            className="flex items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e]"
            key={item.id}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold text-white">
              {item.name.slice(0, 1)}
            </div>
            <h4>{item.username}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;

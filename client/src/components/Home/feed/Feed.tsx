import { useState } from "react";
import useSearchUsername from "../../../hooks/useSearchUsername";
import SingleItem from "./SingleItem";

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
          <SingleItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Feed;

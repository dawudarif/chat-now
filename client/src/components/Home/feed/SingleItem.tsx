import { ISearchResult } from "../../../types/types";

interface SingleItemProps {
  data: ISearchResult;
}

const SingleItem: React.FC<SingleItemProps> = ({ data }) => {
  return (
    <div
      className="flex items-center gap-3 border-b border-[#252525] p-2 text-white hover:bg-[#1c1c1e]"
      key={data.id}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] font-bold text-white">
        {data.name.slice(0, 1)}
      </div>
      <div>{data.username}</div>
    </div>
  );
};

export default SingleItem;

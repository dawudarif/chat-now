const SingleMessageSkeleton = ({ i }: { i: number }) => {
  return (
    <div
      className={`box-border flex w-[100%] animate-pulse px-3 py-2 ${
        i % 2 ? "justify-end" : "justify-start"
      }`}
    >
      <p
        className={`${i % 3 ? `h-[4rem] w-[18rem] ` : `h-[5rem] w-[24rem]`} ${
          i % 2 ? `bg-[#252525]` : `bg-blue-500`
        } rounded-2xl p-2 text-white`}
      ></p>
    </div>
  );
};

export default SingleMessageSkeleton;

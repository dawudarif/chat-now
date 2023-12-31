import moment from "moment";
import React from "react";
import { IMessage } from "../../../types/types";

interface SingleMessageProps {
  message: IMessage;
  messages: Array<IMessage>;
  sentByMe: boolean;
  index: number;
  length: number;
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  message,
  sentByMe,
  index,
  length,
  messages,
}) => {
  const getDateFormat = (date: string) => {
    return moment(date).format("DD/MM/YY");
  };

  const first = index === length - 1;

  const display =
    index !== length - 1 &&
    getDateFormat(messages[index + 1].createdAt) !==
      getDateFormat(message.createdAt);

  return (
    <div>
      {(first || display) && (
        <p className="text-md py-6 text-center font-mono text-white">
          {getDateFormat(message.createdAt)}
        </p>
      )}

      <div
        className={`box-border flex w-[100%] break-words px-3 py-2 ${
          sentByMe ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-h-max min-w-[5rem] max-w-[50%] flex-col rounded-xl ${
            sentByMe ? "bg-[#252525]" : "bg-blue-500"
          } p-2`}
        >
          <p className="text-white">{message.body}</p>
          <p className="text-right font-mono text-xs">
            {moment(message.createdAt).format("hh:mm")}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SingleMessage;

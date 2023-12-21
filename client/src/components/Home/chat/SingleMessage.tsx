import React from "react";
import { IMessage } from "../../../types/types";

interface SingleMessageProps {
  message: IMessage;
  sentByMe: boolean;
}

const SingleMessage: React.FC<SingleMessageProps> = ({ message, sentByMe }) => {
  return (
    <div
      className={`box-border flex w-[100%] break-words px-3 py-2 ${
        sentByMe ? "justify-end" : "justify-start"
      }`}
    >
      <p className="max-h-max max-w-[50%] rounded-xl bg-blue-500 p-2 text-white">
        {message.body}
      </p>
    </div>
  );
};
export default SingleMessage;

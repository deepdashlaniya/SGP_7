import React from "react";

const ErrorMessage = ({ message = "" }: { message?: string }) => {
  return <p className="text-red mt-2">{message}</p>;
};

export default ErrorMessage;

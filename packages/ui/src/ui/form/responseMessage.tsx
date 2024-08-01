import React from "react";

export function ResponseMessage(props: ResponseMessageProps) {
  const { successMessage, errorMessage } = props;
  return successMessage !== "" ? (
    <p className="font-medium text-sm text-green-500 text-center">
      {successMessage}
    </p>
  ) : (
    errorMessage !== "" && (
      <p className="font-medium text-sm text-red-500 text-center">
        {errorMessage}
      </p>
    )
  );
}

type ResponseMessageProps = {
  successMessage: string;
  errorMessage: string;
};

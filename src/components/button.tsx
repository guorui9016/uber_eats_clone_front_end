import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  btnText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  btnText
}) => (
  <button
    className={`py-3 px-2 mx-16 my-4 text-center text-lg text-white rounded-md ${
      canClick
        ? " bg-lime-600 hover:bg-lime-500  transition-colors"
        : " bg-gray-300 pointer-events-none"
    } `}
  > 
    {loading ? "Loading..." : btnText}
  </button>
);

"use client";

import React from "react";

interface Props {
  className?: string;
  label?: string;
  placeholder?: string;
  id?: string;
  type: string;
  name: string;
  register: any;
  isRequired?: boolean;
}

const TextInput: React.FC<Props> = ({
  register,
  className,
  label,
  placeholder,
  id,
  type,
  isRequired,
  name,
}) => {
  return (
    <>
      <label htmlFor="username" className="text-variant1">
        {label} {isRequired ? <span className="text-primary">*</span> : ""}
      </label>
      <input
        {...register(name)}
        className="border-line px-4 pt-3 pb-3 w-full rounded-lg mt-2"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextInput;

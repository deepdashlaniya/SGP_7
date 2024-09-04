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
  options?: string[];
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
  options,
}) => {

  return (
    <>
      <label htmlFor="username" className="text-variant1">
        {label} {isRequired ? <span className="text-primary">*</span> : ""}
      </label>

      {type === "select" && options ? (
        <select
          {...register(name)}
          className="border-line border-solid border-2 border-slate-50 px-4 pt-3 pb-3 w-full  rounded-lg mt-2 "
          id={id}
          name={name}
        >
          <option value="" disabled selected>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(name)}
          className="border-line px-4 pt-3 pb-3 w-full rounded-lg mt-2" 
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      )}

      {/* <input
        {...register(name)}
        className="border-line px-4 pt-3 pb-3 w-full rounded-lg mt-2"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      /> */}
    </>
  );
};

export default TextInput;

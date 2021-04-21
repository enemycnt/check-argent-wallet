import React from "react";
import { useForm } from "react-hook-form";
import { utils } from "ethers";

const errorMessages = {
  required: "Ethereum address is required",
  validate: "Invalid Ethereum address",
};

function Form(props) {
  const { setAddress } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => setAddress(data.address);

  const inputClass = errors.address
    ? "border-red-300 focus:border-red-300 focus:ring-red-200"
    : " border-gray-300 focus:border-indigo-300 focus:ring-indigo-200";

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="address" className="text-xl">
          Enter your wallet address:
        </label>
      </div>
      <div className="flex space-x-4">
        <input
          autoFocus
          name="address"
          id="address"
          type="text"
          defaultValue="0x592859824C9D8A97e0f61B22765fE1302fF3Bb60"
          {...register("address", {
            required: true,
            validate: (v) => utils.isAddress(v),
          })}
          className={`flex-auto block w-full shadow-sm focus:ring focus:ring-opacity-50 ${inputClass}`}
        />
        <button className="flex-none px-4 block border hover:border-transparent border-gray-300 shadow-sm font-semibold focus:border-indigo-300 hover:bg-black hover:text-white focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:outline-none">
          {">>>"}
        </button>
      </div>
      <div className="h-1">
        {errors.address && (
          <div className=" text-red-600">
            {errorMessages[errors.address.type]}
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;

import React from 'react'

const InputType = ({labelText,labelFor,value,onChange,name,inputType}) => {
  return (
    <div>
      <div className="flex flex-row justify-between p-3">
        <label
          htmlFor={labelFor}
          className="text-lg pr-16 font-medium text-white"
        >
          {labelText}
        </label>
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={name}
          className="p-1 w-1/2 rounded-md bg-transparent border-2 border-white/80 text-white"
        />
      </div>
    </div>
  )
}

export default InputType

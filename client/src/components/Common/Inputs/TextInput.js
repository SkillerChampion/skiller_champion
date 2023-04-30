const TextInput = ({
  label = '',
  setValue,
  value = '',
  type = 'text',
  placeholder = '',
  disabled = false
}) => {
  return (
    <div>
      <label className="block text-xxs sm:text-sm md:text-base font-medium leading-6 pinkWhiteText GrindFontFamily">
        {label}
      </label>
      <div className="mt-1 sm:mt-2">
        <input
          type={type}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          disabled={disabled}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
           ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
            text-xxs sm:text-sm md:text-base sm:leading-6 pl-2 sm:pl-4 outline-none GrindFontFamily"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextInput;

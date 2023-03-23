const NumberInput = ({ value, setValue }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    const parseToInt = parseInt(value);

    if (parseToInt && parseToInt > 0) {
      setValue(parseToInt);
    } else setValue(1);
  };

  return (
    <input
      type="number"
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
   text-xs sm:text-sm md:text-base sm:leading-6 pl-2 sm:pl-4 mr-2 sm:mr-2 outline-none GrindFontFamily"
      onChange={handleChange}
      value={value}
    />
  );
};

export default NumberInput;

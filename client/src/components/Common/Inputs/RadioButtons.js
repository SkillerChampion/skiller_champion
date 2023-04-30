import { ARRAY_KEYS } from '../../../utils/constants';

const RadioButtons = ({ options = [], heading = '', data = {}, setData }) => {
  return (
    <fieldset>
      <div className="pb-[15px] lg:pb-[25px] text-indigo-500 text-lg sm:text-xl lg:text-2xl whitespace-nowrap">
        {heading}
      </div>
      <div className="space-y-2 md:space-y-5">
        {options.map((item) => {
          return (
            <div key={item?.[ARRAY_KEYS.VALUE]} className="relative flex items-center">
              <div className="flex h-6 items-center">
                <input
                  name="Pass"
                  type="radio"
                  checked={item?.[ARRAY_KEYS.VALUE] === data?.[ARRAY_KEYS.VALUE]}
                  value={item?.[ARRAY_KEYS.VALUE]}
                  onChange={() => {
                    setData(item);
                  }}
                  className="h-4 w-4 border-gray-300 accent-indigo-600 focus:ring-indigo-600 cursor-pointer"
                />
              </div>
              <div className="ml-3 text-xs md:text-sm leading-6">
                <label className="font-medium text-indigo-500 ">{item?.[ARRAY_KEYS.LABEL]}</label>{' '}
                <span className="text-white">{item?.[ARRAY_KEYS.DESCRIPTION]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RadioButtons;

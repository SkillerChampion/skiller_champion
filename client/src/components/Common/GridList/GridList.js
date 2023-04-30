import { PlayIcon } from '@heroicons/react/20/solid';
import hederaWhiteIcon from '../../../assets/hederaWhiteIcon.png';

const GridList = ({ data }) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((person, index) => (
        <li
          key={index}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-900 border-2 border-indigo-600 shadow heliosFontFamily overflow-hidden">
          <div className="text-center py-1 bg-green-400 text-gray-900 text-xs sm:text-sm ">
            Active
          </div>
          <div className="flex w-full items-center justify-between space-x-6 py-6 px-3">
            <div className="flex-1 truncate">
              <div className="flex items-center justify-between">
                <img src={hederaWhiteIcon} alt="Hedera Icon" className="h-6 sm:h-8" />
                <h3 className="truncate text-base font-medium text-white ">
                  {person.amount}
                  {' HBARS'}
                </h3>
                <img src={hederaWhiteIcon} alt="Hedera Icon" className="h-6 sm:h-8" />
              </div>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-indigo-500">
              <div className="flex w-0 flex-1">
                <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border-t-2 border-indigo-600 py-2 sm:py-4 text-xs sm:text-sm font-medium text-white hover:cursor-pointer hover:bg-indigo-600">
                  <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white " aria-hidden="true" />
                  Match bet
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridList;

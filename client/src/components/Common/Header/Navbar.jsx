/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../../assets/logo.png';
import { useLocation } from 'react-router-dom';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { WalletContext } from '../../../context/WalletContext';
import ConnectedWallet from './ConnectedWallet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NAVBAR_ROUTES_MORE, ALL_ROUTES_PATHS, NAVBAR_ROUTES_GAMES } from '../../../utils/routes';

const Dropdown = ({ title = '', data = [] }) => (
  <div
    className={`${'text-gray-300 hover:bg-indigo-600 hover:text-white border-transparent rounded-md'}
    pl-3 pr-7 py-2 text-xs lg:text-13px font-medium border-b-2 whitespace-nowrap relative group z-50 `}>
    {title}
    <KeyboardArrowDownIcon className={classes.arrow} />
    <div>
      <div className="absolute w-[250px] bg-gray-800 border-2 border-indigo-600 rounded-md p-[5px] z-50 left-[-55%] top-[30px] hidden group-hover:inline-block transition-all 200ms ease-in">
        {data.map((item) => (
          <Link
            key={item.pathName}
            to={item.pathName}
            className=" w-full h-10 rounded-md flex items-center  hover:bg-indigo-500 cursor-pointer px-3">
            {item.heading}
          </Link>
        ))}
      </div>
    </div>
  </div>
);
export default function Header() {
  const location = useLocation();
  const { connectToHashPack, userAccountId } = useContext(WalletContext);

  return (
    <Disclosure as="nav" className={`relative headerPurpleBG z-50`}>
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 z-50">
            <div className="flex h-16 sm:h-20 justify-between z-50">
              <div className="flex z-50">
                <div className="-ml-2 mr-2 flex items-center lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link to={ALL_ROUTES_PATHS.LANDING} className="flex z-20">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-5 sm:h-8 w-auto lg:hidden z-20"
                      src={logo}
                      alt="Skiller champion"
                    />
                    <img
                      className={`hidden lg:block ${classes.logo} z-20`}
                      src={logo}
                      alt="Skiller champion"
                    />
                  </div>
                  <div
                    className={`${classes.reduceLineHeight} text-xs sm:text-xl lg:text-2xl ml-4 flex items-center bold pinkWhiteText GrindFontFamily max-w-min xl:max-w-max`}>
                    Skiller Champion
                  </div>
                </Link>
              </div>
              <div className="flex gap-10 items-center z-50 ">
                <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4">
                  <Dropdown title="Games" data={NAVBAR_ROUTES_GAMES} />
                  <Dropdown title="More" data={NAVBAR_ROUTES_MORE} />
                </div>
                <div className="flex items-center scale-75 sm:scale-100 -mr-7 sm:m-0">
                  {userAccountId ? (
                    <ConnectedWallet />
                  ) : (
                    <Button text="Connect Wallet" onClick={connectToHashPack} isHashPackBtn />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            {({ close }) => (
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {[...NAVBAR_ROUTES_GAMES, ...NAVBAR_ROUTES_MORE].map((item) => (
                  <Link
                    key={item.heading}
                    to={item.pathName}
                    onClick={close}
                    className={`${
                      location.pathname === item.pathName
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                    block rounded-md px-3 py-2 text-xs font-medium
                  `}>
                    {item.heading}
                  </Link>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

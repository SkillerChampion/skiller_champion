/* eslint-disable no-unused-vars */

import { useState } from 'react';
import classes from './Index.module.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SideBar = ({ navigation }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div
        className={`hidden md:fixed md:flex w-[200px] lg:w-[300px] z-50 md:flex-col h-full ${classes.headerSpace}`}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
          <nav className="flex flex-1 flex-col mt-5">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <div
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-600 text-white'
                            : 'text-indigo-200 hover:text-white hover:bg-indigo-600',
                          'group flex gap-x-3 rounded-md p-2 text-xs lg:text-sm leading-6 items-center MontserratFamily font-semibold'
                        )}>
                        <item.icon
                          className={classNames(
                            item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                            'h-4 w-4 lg:h-6 lg:w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;

import classes from './index.module.css';
import { ARRAY_KEYS } from '../../../utils/constants';

const PageLevelTabs = ({
  tabs = [],
  currentTab = {},
  setCurrentTab = () => {},
  showPassCount = false,
  spaceHr = false
}) => {
  const handleTabClick = (tab) => {
    console.log('tab', tab);
    setCurrentTab(tab);
  };

  const handleTabClickSm = (e) => {
    const value = e.target.value;
    const findTab = tabs?.find((item) => item[ARRAY_KEYS.LABEL] === value);
    console.log('value', findTab);

    setCurrentTab(findTab);
  };

  return (
    <div>
      <div className={`sm:hidden ${spaceHr ? 'mb-4' : 'mb-0'}`}>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pl-2 bg-indigo-600 text-sm text-white"
          defaultValue={currentTab[ARRAY_KEYS.LABEL]}
          onChange={handleTabClickSm}>
          {tabs.map((tab) => (
            <option key={tab[ARRAY_KEYS.VALUE]}>{tab[ARRAY_KEYS.LABEL]}</option>
          ))}
        </select>
      </div>
      <div className={`hidden sm:block `}>
        <nav
          className={`flex ${showPassCount ? 'space-x-4 md:space-x-7' : 'space-x-2 md:space-x-4'}`}
          aria-label="Tabs">
          {tabs.map((tab) => {
            const passCount = tab[ARRAY_KEYS.PASS_COUNT]?.length ?? 0;

            return (
              <div
                key={tab[ARRAY_KEYS.VALUE]}
                className={`
              ${showPassCount ? classes.hover_background : classes.hover_background_no_count} ${
                  currentTab[ARRAY_KEYS.VALUE] === tab[ARRAY_KEYS.VALUE] && classes.selectedNavTitle
                }
                ${
                  currentTab[ARRAY_KEYS.VALUE] === tab[ARRAY_KEYS.VALUE]
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-gray-500'
                }
               px-4 py-2 text-sm font-medium hover:cursor-pointer flex 
               `}
                onClick={() => handleTabClick(tab)}>
                <div>{tab[ARRAY_KEYS.LABEL]}</div>

                {showPassCount && (
                  <div
                    className={`ml-[5px]  ${
                      currentTab[ARRAY_KEYS.VALUE] === tab[ARRAY_KEYS.VALUE]
                        ? `bg-white`
                        : 'bg-indigo-600'
                    }
                ${
                  currentTab[ARRAY_KEYS.VALUE] === tab[ARRAY_KEYS.VALUE] && classes.fixAspectRatio
                } rounded-full w-8 h-8 text-center flex items-center justify-center text-lg`}>
                    {passCount}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div
          className={`w-full h-2 ${spaceHr ? 'mb-6' : 'mb-0'} bg-indigo-600 rounded-lg mt-4`}></div>
      </div>
    </div>
  );
};

export default PageLevelTabs;

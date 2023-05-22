import React from 'react';
import { ALL_ROUTES_PATHS, hashLink } from '../../../utils/routes';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  const LINKS = [
    {
      path: `${ALL_ROUTES_PATHS.TERMS_AND_CONDITIONS}#${hashLink.TermsAndConditions}`,
      name: 'Terms of service'
    },
    {
      path: `${ALL_ROUTES_PATHS.TERMS_AND_CONDITIONS}#${hashLink.privacyPolicy}`,
      name: 'Privacy Policy'
    }
  ];
  return (
    <div className="w-full headerPurpleBG">
      <div className="flex flex-col md:flex-row  md:justify-start p-4 md:p-10 gap-5 md:gap-20 items-center h-full">
        <div
          className={`text-xxs sm:text-lg flex items-center bold pinkWhiteText GrindFontFamily whitespace-nowrap`}>
          Skiller Champion
        </div>
        <div className="flex gap-4 md:gap-10">
          {LINKS.map((item) => (
            <HashLink
              key={item.name}
              to={item.path}
              smooth
              className="text-xs underline text-white MontserratFamily">
              {item.name}
            </HashLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

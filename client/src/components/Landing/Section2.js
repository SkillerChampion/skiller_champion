import React from 'react';
import playSection from '../../assets/playSection.png';
import BodyContainer from '../Common/BodyContainer/BodyContainer';

const Section2 = () => {
  return (
    <BodyContainer negativeTopMargin>
      <div className="lg:flex flex-row-reverse pb-24 sm:pb-32">
        <div className="mx-auto max-w-lg flex-shrink-0 lg:mx-0 xl:max-w-2xl lg:pt-8">
          <h1
            className={`mt-10 text-xl sm:text-3xl xl:text-4xl font-bold tracking-tight text-white pinkWhiteText text-center lg:text-left GrindFontFamily`}>
            Mock your opponent by betting and winning the riddle battle (coming soon..)
          </h1>
          <p className="mt-6 text-xxs md:text-base  leading-8 text-white lg:pr-24 text-center lg:text-left heliosFontFamily">
            To be announced soon...
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl sm:mt-14 lg:mr-10 lg:mt-0 lg:ml-0 lg:max-w-none lg:flex-none xl:mr-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src={playSection}
              alt="Riddles Game"
              className="w-[60rem] rounded-xl bg-gray-700 shadow-2xl ring-1 ring-gray-700 mt-4"
            />
          </div>
        </div>
      </div>
    </BodyContainer>
  );
};

export default Section2;

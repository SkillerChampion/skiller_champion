import hederaIcon from '../../../assets/hederaIcon.png';

export default function BuiltOnHederaBanner() {
  return (
    <div
      className={`flex items-center px-6 sm:px-3.5 justify-between w-full gap-x-5 bannerPurpleBG relative py-1`}>
      <img src={hederaIcon} className="w-6 sm:w-7 z-10" alt="" />

      <p className="text-xs sm:text-base lg:text-lg leading-6 flex justify-center items-center font-bold text-white heliosFontFamily">
        Launching Founders NFTs soon. Stayss tune
      </p>
      <img src={hederaIcon} className="w-6 sm:w-7 z-10" alt="" />
    </div>
  );
}

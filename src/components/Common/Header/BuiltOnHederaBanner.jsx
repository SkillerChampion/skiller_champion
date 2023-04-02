import hederaIcon from '../../../assets/hederaIcon.png';
import { useState, useContext } from 'react';
import { submitUserEmail } from '../../../services/hederaService';
import { WalletContext } from '../../../context/WalletContext';
import { displayErrors } from '../../../utils/helperFunctions';
import { toast } from 'react-toastify';

export default function BuiltOnHederaBanner() {
  const { userAccountId } = useContext(WalletContext);

  const [email, setEmail] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitUserEmail(email, userAccountId);

      if (res) {
        toast.success("We'll keep you updated");
        setEmail('');
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        displayErrors(errors);
      } else toast.error('Something went wrong...');
    }
  };

  return (
    <div
      className={`flex items-center px-6 sm:px-3.5 justify-between w-full gap-x-5 bannerPurpleBG relative py-1`}>
      <img src={hederaIcon} className="w-6 sm:w-7 z-10" alt="" />

      <div className="flex flex-col lg:flex-row gap-1 lg:gap-3 items-center">
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <p className="text-xxs sm:text-[14px] leading-6 flex justify-center items-center font-bold text-white heliosFontFamily">
            Founders NFTs soon.
          </p>
          <p className="text-xxs sm:text-[14px] leading-6 flex justify-center items-center font-bold text-white heliosFontFamily">
            enter email to get updates -
          </p>
        </div>

        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            className="bg-gray-800 text-white rounded-md text-xs sm:text-sm px-2 w-[210px] sm:w-[300px] py-1 MontserratFamily font-semibold "
            placeholder="yourEmail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
      </div>

      <img src={hederaIcon} className="w-6 sm:w-7 z-10" alt="" />
    </div>
  );
}

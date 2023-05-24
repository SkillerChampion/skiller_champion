/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import classes from './TermsAndConditions.module.css';
import { Scrollbar } from 'react-scrollbars-custom';
import Switch from '../Button/Switch';
import { LOCAL_STORAGE_KEYS } from '../../../utils/constants';
import Button from '../Button/Button';
import { isTermsAccepted } from '../../../utils/helperFunctions';
import TermsAndPrivacy from './TermsAndPrivacy';

const TermsAndConditions = () => {
  const [checked, setChecked] = useState(false);

  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (isTermsAccepted()) closeModal();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAccept = () => {
    if (!checked) return;

    localStorage.setItem(LOCAL_STORAGE_KEYS.IS_T_AND_C_ACCEPTED, checked);
    closeModal();
  };

  return (
    <div className="relative">
      <div
        className={`fixed h-screen top-[var(--navbarHeight)] left-0 w-full z-[10000] ${
          !showModal && 'hidden'
        }`}>
        <Modal showModal={showModal} className={`${classes.modalRoot} ${classes.modalRootChild}`}>
          <div className="h-full w-full flex flex-col gap-4">
            <div className={classes.heading}>Platform policies</div>
            <Scrollbar>
              <div className={`pr-[15px] break-words ${classes.root}`}>
                <TermsAndPrivacy showContainer={false} isModalView />
              </div>
            </Scrollbar>

            <div className="flex flex-col gap-2 lg:gap-3 pr-[20px]">
              <div className="flex justify-between items-center ">
                <div className={classes.bottom}>I accept the terms and conditions</div>
                <Switch checked={checked} setChecked={setChecked} />
              </div>
              <Button
                text="I Accept"
                allowFullWidth
                disabled={!checked}
                btnClassName="flex justify-center"
                onClick={handleAccept}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TermsAndConditions;

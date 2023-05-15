/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import classes from './SocialMediaLinks.module.css';
import { TWENTY_SECONDS, EXTERNAL_LINKS } from '../../../utils/constants';
import discordIcon from '../../../assets/discordIcon.png';
import { useLocation } from 'react-router-dom';

const SocialMediaLinks = () => {
  // TODO add links
  const mainCircleId = 'mainCircleId';
  const revealDivId = 'revealDivId';

  const [showAllIcons, setShowAllIcons] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (showAllIcons) {
      const mainCircle = document.getElementById(mainCircleId);
      const otherCircle = document.getElementById(revealDivId);

      mainCircle?.classList?.add(classes.spinning);
      otherCircle?.classList?.add(classes.revealIcons);
    }
  }, [showAllIcons]);

  useEffect(() => {
    setShowAllIcons(false);
  }, [pathname]);

  const handleCircleClick = () => {
    if (!showAllIcons) {
      setShowAllIcons(true);

      setTimeout(() => {
        setShowAllIcons(false);
      }, TWENTY_SECONDS);
    }
  };

  const handleTwitterClick = () => {
    if (!showAllIcons) return;
    window.open(EXTERNAL_LINKS.SKILLER_TWITTER, '_blank').focus();
  };

  const handleDiscordClick = () => {
    if (!showAllIcons) return;
    window.open(EXTERNAL_LINKS.SKILLER_DISCORD, '_blank').focus();
  };

  const TwitterButton = () => {
    return (
      <div
        className={`w-14 h-14 rounded-full flex justify-center items-center ${classes.twitterParent} cursor-pointer `}
        id={mainCircleId}
        onClick={handleTwitterClick}>
        <TwitterIcon className={`${classes.twitter}`} />
      </div>
    );
  };

  const AllIcons = () => {
    return (
      <div
        className={`h-14 bg-gray-900 w-14 rounded-full ${classes.allIconsRoot}`}
        id={revealDivId}>
        <img
          src={discordIcon}
          className="rounded-full w-14 h-14 cursor-pointer"
          onClick={handleDiscordClick}
        />
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" onClick={handleCircleClick}>
      <AllIcons />
      <TwitterButton />
    </div>
  );
};

export default SocialMediaLinks;

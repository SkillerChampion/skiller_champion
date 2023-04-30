import classes from './Index.module.css';
import { Link } from 'react-router-dom';
import mainpage from '../../assets/mainpage.jpg';
import wheel2000 from '../../assets/wheel2000.jpg';
import { ALL_ROUTES_PATHS } from '../../utils/routes';

const SectionParagraph = ({ heading = '', id = '', children }) => {
  return (
    <div className="relative">
      <div className="absolute -top-32" id={id}></div>
      <div className="mt-8 md:mt-14">
        <div className={`mb-1 ${classes.heading}`}>{heading}</div>
        <section>{children}</section>
      </div>
    </div>
  );
};

const Paper = ({ linkName }) => {
  return (
    <div className="pb-32 relative">
      <p className={`${classes.heading}`}>Welcome to the Skiller Champion</p>
      <p className={`${classes.bodyText} mt-1`}>
        In Skiller Champion, gameplay involves around providing the real world utilities to NFTs. We
        are building Play to Earn games for Hedera and its community in which players can earn HBARs
        by winning games by skills or luck.
      </p>

      <img src={mainpage} className="rounded-xl mx-auto w-11/12 lg:w-3/4 mt-6 sm:mt-10" />

      <SectionParagraph heading={`${linkName.motivation} -`} id={linkName.motivation}>
        <div className="flex flex-col gap-5">
          <div className={`${classes.bodyText}`}>
            Our primary motive is to build and deliver valuable games to Hedera community. We are
            building a strong and robust community who will support us and in return we are hoping
            to provide them with huge profits through various revenue streams. We are aiming to be
            one of the top community driven Hedera gaming project and are working tirelessly on our
            product with trustless integration on Hedera Hashgraph.
          </div>
          {
            //TODO add github link
          }
          <div className={`${classes.bodyText}`}>
            All of our gambling games are fair, 100% randomized and as a proof we have attached the
            public <a className={`${classes.link}`}>link</a> of our Github code that our application
            uses to obtain random winners. This is a community driven project in which we will share
            the revenue generated from the upcoming NFTs secondary sales and platform fees (more
            details soon..) with our premium NFT holders
          </div>
        </div>
      </SectionParagraph>

      <SectionParagraph heading={`${linkName.fortuneWheel} -`} id={linkName.fortuneWheel}>
        <div className="flex flex-col gap-5">
          <div className={`${classes.bodyText}`}>
            Fortune wheel is our first gambling game that provides an unique user experience and
            utility to the NFTs. Players have to buy Platinum, Gold or Silver pass NFTs (
            <Link to={ALL_ROUTES_PATHS.WHEEL_OF_FORTUNE} className={`${classes.link}`}>
              click here
            </Link>
            ) to rotate the wheel and try their luck. Based on the purchased pass, players can win
            upto 5000 HBARs. All of the games are 100% random and fair{' '}
            <a className={`${classes.link}`}>(see proof)</a>.
          </div>
          <img
            src={wheel2000}
            className={`rounded-full mx-auto w-8/12 lg:w-5/12 mt-6 sm:mt-10 ${classes.wheelAnim}`}
          />
        </div>
      </SectionParagraph>

      <SectionParagraph heading={`${linkName.riddles} -`} id={linkName.riddles}>
        <div className="flex flex-col gap-5">
          <div className={`${classes.bodyText}`}>
            Riddles is our upcoming skill based multiplayer game where players have to beat their
            opponents to win the game. The player who wins the game wins the bet amount. We are
            working hard to complete the game and more details will be revealed soon.
            {/* The player who answers the most
            riddles correctly with least time wins the battle */}
          </div>
        </div>
      </SectionParagraph>

      <SectionParagraph heading={`${linkName.founderNfts} -`} id={linkName.founderNfts}>
        <div className="flex flex-col gap-5">
          <div className={`${classes.bodyText}`}>
            Once our project picks up the pace, we will launch the Founders NFTs that will initiate
            the revenue sharing business model to airdrop many HBARs to the wallets of our premium
            NFT holders
          </div>

          <div className={`${classes.bodyText}`}>
            The holders will also be eligible to receive free fortune wheel passes frequently
          </div>
        </div>
      </SectionParagraph>
    </div>
  );
};

export default Paper;

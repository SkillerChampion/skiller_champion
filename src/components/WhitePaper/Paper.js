import classes from './Index.module.css';
import mainpage from '../../assets/mainpage.jpg';

const SectionParagraph = ({ heading = '', children }) => {
  return (
    <div className="mt-8 md:mt-14">
      <div className={`mb-1 ${classes.heading}`}>{heading}</div>
      <section>{children}</section>
    </div>
  );
};

const Paper = () => {
  return (
    <div className="pb-32">
      <p className={`${classes.heading}`}>Welcome to the Skiller Champion</p>
      <p className={`${classes.bodyText} mt-1`}>
        In Skiller Champion, gameplay involves around providing the real world utilities to NFTs. We
        are building Play to Earn games for Hedera and its community in which players can earn HBARs
        by winning games by skills or luck.
      </p>

      <img src={mainpage} className="rounded-xl mx-auto w-3/4 mt-10" />

      <SectionParagraph heading="Motivation -">
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
            details soon..)
          </div>
        </div>
      </SectionParagraph>
    </div>
  );
};

export default Paper;

import SideBar from './SideBar';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import Paper from './Paper';
import { ALL_ROUTES_PATHS } from '../../utils/routes';

import { Scrollbar } from 'react-scrollbars-custom';

const Index = () => {
  const linkName = {
    motivation: 'Motivation',
    fortuneWheel: 'Wheel Of Fortune',
    riddles: 'Riddles',
    founderNfts: 'Founders Premium NFTs'
  };

  const navigation = [
    { name: linkName.motivation, path: `${ALL_ROUTES_PATHS.WHITE_PAPER}#${linkName.motivation}` },
    {
      name: linkName.fortuneWheel,
      path: `${ALL_ROUTES_PATHS.WHITE_PAPER}#${linkName.fortuneWheel}`
    },
    { name: linkName.riddles, path: `${ALL_ROUTES_PATHS.WHITE_PAPER}#${linkName.riddles}` },
    { name: linkName.founderNfts, path: `${ALL_ROUTES_PATHS.WHITE_PAPER}#${linkName.founderNfts}` }
  ];
  return (
    <div className={`w-full flex h-full relative -mt-[20px]`}>
      <SideBar navigation={navigation} />

      <Scrollbar className={`h-full w-full`}>
        <BodyContainer
          rootClassName="w-full bg-indigo-700 md:pl-[200px] lg:pl-[300px] -mt-[10px] pt-0"
          heading="WHITEPAPER V1 -"
          headingClass="MontserratFamily font-bold"
          whiteHeading>
          <Paper linkName={linkName} />
        </BodyContainer>
      </Scrollbar>
    </div>
  );
};

export default Index;

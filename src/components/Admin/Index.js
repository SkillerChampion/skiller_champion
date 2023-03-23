/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import Button from '../Common/Button/Button';

import GrayCard from '../Common/Cards/GrayCard';
import { createNewTopic } from '../../services/hederaService';

const Index = () => {
  return (
    <BodyContainer rootClassName="h-full">
      <GrayCard>
        <Button onClick={createNewTopic} text="Create new topic" />
      </GrayCard>
    </BodyContainer>
  );
};

export default Index;

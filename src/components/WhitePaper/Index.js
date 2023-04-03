import SideBar from './SideBar';
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import Paper from './Paper';
import { Scrollbar } from 'react-scrollbars-custom';

const Index = () => {
  const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false }
  ];
  return (
    <div className={`w-full flex h-full relative`}>
      <SideBar navigation={navigation} />

      <Scrollbar className={`h-full w-full`}>
        <BodyContainer
          rootClassName="w-full bg-indigo-700 md:pl-[200px] lg:pl-[300px] pt-[60px]"
          heading="WHITEPAPER V1 -"
          headingClass="MontserratFamily font-bold"
          whiteHeading>
          <Paper />
        </BodyContainer>
      </Scrollbar>
    </div>
  );
};

export default Index;

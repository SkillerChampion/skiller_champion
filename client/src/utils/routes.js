import { lazy } from 'react';

const Dashboard = lazy(() => import('../components/Play/Index'));
const Landing = lazy(() => import('../components/Landing/Index'));
const WheelOfFortune = lazy(() => import('../components/Games/WheelOfFortune/Index'));
const LeaderBoard = lazy(() => import('../components/LeaderBoard/Index'));
const WhitePaper = lazy(() => import('../components/WhitePaper/Index'));
const TermsAndPrivacy = lazy(() =>
  import('../components/Common/TermsAndConditions/TermsAndPrivacy.js')
);
const KeyPresserGame = lazy(() => import('../components/Games/ScrollGame/Index'));

export const ALL_ROUTES_PATHS = {
  LANDING: '/',
  DASHBOARD: '/play',
  WHEEL_OF_FORTUNE: '/wheelOfFortune',
  ADMIN: '/admin',
  LEADER_BOARD: '/leaderBoard',
  WHITE_PAPER: '/whitepaper',
  TERMS_AND_CONDITIONS: '/termsAndPolicy',
  KEY_PRESSER_GAME_PLAY: '/keyPresserGamePlay'
};

export const hashLink = {
  TermsAndConditions: 'TermsAndConditions',
  privacyPolicy: 'PrivacyPolicy'
};

export const ALL_ROUTES = [
  {
    pathName: ALL_ROUTES_PATHS.LANDING,
    Component: Landing,
    heading: 'Landing'
  },
  {
    pathName: ALL_ROUTES_PATHS.WHEEL_OF_FORTUNE,
    Component: WheelOfFortune,
    heading: 'Wheel Of Fortune'
  },

  { pathName: ALL_ROUTES_PATHS.DASHBOARD, Component: Dashboard, heading: 'Riddles' },
  { pathName: ALL_ROUTES_PATHS.LEADER_BOARD, Component: LeaderBoard, heading: 'Leader Board' },
  { pathName: ALL_ROUTES_PATHS.WHITE_PAPER, Component: WhitePaper, heading: 'White Paper' },
  {
    pathName: ALL_ROUTES_PATHS.KEY_PRESSER_GAME_PLAY,
    Component: KeyPresserGame,
    heading: 'Key Presser'
  },
  {
    pathName: ALL_ROUTES_PATHS.TERMS_AND_CONDITIONS,
    Component: TermsAndPrivacy,
    heading: 'Terms And Conditions'
  }
];

export const NAVBAR_ROUTES_MORE = [ALL_ROUTES[3], ALL_ROUTES[4]];

export const NAVBAR_ROUTES_GAMES = [ALL_ROUTES[1], ALL_ROUTES[5], ALL_ROUTES[2]];

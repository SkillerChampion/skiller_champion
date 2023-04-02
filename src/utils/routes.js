import { lazy } from 'react';

const Dashboard = lazy(() => import('../components/Play/Index'));
const Landing = lazy(() => import('../components/Landing/Index'));
const WheelOfFortune = lazy(() => import('../components/WheelOfFortune/Index'));
const LeaderBoard = lazy(() => import('../components/LeaderBoard/Index'));
const WhitePaper = lazy(() => import('../components/WhitePaper/Index'));

export const ALL_ROUTES_PATHS = {
  LANDING: '/',
  DASHBOARD: '/play',
  WHEEL_OF_FORTUNE: '/wheelOfFortune',
  ADMIN: '/admin',
  LEADER_BOARD: '/leaderBoard',
  WHITE_PAPER: '/whitepaper'
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
  { pathName: ALL_ROUTES_PATHS.WHITE_PAPER, Component: WhitePaper, heading: 'White Paper' }
];

export const NAVBAR_ROUTES = [ALL_ROUTES[1], ALL_ROUTES[2], ALL_ROUTES[3], ALL_ROUTES[4]];

import { lazy } from 'react';

const Dashboard = lazy(() => import('../components/Play/Index'));
const Landing = lazy(() => import('../components/Landing/Index'));
const WheelOfFortune = lazy(() => import('../components/WheelOfFortune/Index'));

export const ALL_ROUTES_PATHS = {
  LANDING: '/',
  DASHBOARD: '/play',
  WHEEL_OF_FORTUNE: '/wheelOfFortune',
  ADMIN: '/admin'
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
  { pathName: ALL_ROUTES_PATHS.DASHBOARD, Component: Dashboard, heading: 'Play' }
];

export const NAVBAR_ROUTES = [ALL_ROUTES[1], ALL_ROUTES[2]];

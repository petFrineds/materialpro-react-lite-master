import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout'));

/***** Pages ****/

const Starter = lazy(() => import('../views/Starter'));
const Walking = lazy(() => import('../views/ui/Walking'));
const Boards = lazy(() => import('../views/ui/Boards'));
const DogWalker = lazy(() => import('../views/ui/DogWalker'));
const PayHistory = lazy(() => import('../views/ui/PayHistory'));
/*
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Grid = lazy(() => import("../views/ui/Grid"));

const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
*/
/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/starter" /> },
      { path: '/starter', exact: true, element: <Starter /> },
      { path: '/dogWalker', exact: true, element: <DogWalker /> },
      { path: '/walking', exact: true, element: <Walking /> },
      { path: '/boards', exact: true, element: <Boards /> },
      { path: '/payhistory', exact: true, element: <PayHistory /> },
    ],
  },
];

export default ThemeRoutes;

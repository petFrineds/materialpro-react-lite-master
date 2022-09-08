import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout'));

/***** Pages ****/

const Starter = lazy(() => import('../views/Starter'));
const Walking = lazy(() => import('../views/ui/Walking'));
const DogWalker = lazy(() => import('../views/ui/DogWalker'));
const PayHistory = lazy(() => import('../views/ui/PayHistory'));
const Register = lazy(() => import('../views/ui/User/Register'));
const Login = lazy(() => import('../views/ui/User/Login'));
const Reservation = lazy(() => import('../views/ui/Reservation'));
const ReservationDeatil = lazy(() =>
  import('../views/ui/Reservation/Detail/ReservationDetail')
);
const Daily = lazy(() => import('../views/ui/Daily'));
const Profile = lazy(() => import('../views/ui/User/Profile'));

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
      { path: '/payhistory', exact: true, element: <PayHistory /> },
      { path: '/register', exact: true, element: <Register /> },
      { path: '/login', exact: true, element: <Login /> },
      { path: '/profile', exact: true, element: <Profile /> },
      { path: '/reservation', exact: true, element: <Reservation /> },
      {
        path: '/reservationDetail',
        exact: true,
        element: <ReservationDeatil />,
      },
      { path: '/daily', exact: true, element: <Daily /> },
    ],
  },
];

export default ThemeRoutes;

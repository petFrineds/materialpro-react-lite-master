import { Button, Nav, NavItem } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import user1 from '../assets/images/users/user4.jpg';
import probg from '../assets/images/bg/download.jpg';
import { useSelector } from 'react-redux';

const navigation = [
  {
    title: '대쉬보드',
    href: '/starter',
    icon: 'bi bi-speedometer2',
  },
  {
    title: '도그워커 조회',
    href: '/dogWalker',
    icon: 'bi bi-layout-split',
  },
  // {
  //   title: '산책',
  //   href: '/walking',
  //   icon: 'bi bi-bell',
  // },
  {
    title: '일지',
    href: '/daily',
    icon: 'bi bi-card-text',
  },
  {
    title: '예약 조회',
    href: '/reservation',
    icon: 'bi bi-calendar-check',
  },
  {
    title: '결제/포인트내역조회',
    href: '/payhistory',
    icon: 'bi bi-link',
  },
];

const Sidebar = () => {
  const userInfo = useSelector(state => state.user.get('userInfo'));

  const showMobilemenu = () => {
    document.getElementById('sidebarArea').classList.toggle('showSidebar');
  };
  let location = useLocation();

  return (
    <div>
      {sessionStorage.getItem('userId') !== null && (
        <>
          <div className="d-flex align-items-center"></div>
          <div
            className="profilebg"
            style={{ background: `url(${probg}) no-repeat` }}
          >
            <div className="p-3 d-flex">
              <img
                src={
                  userInfo?.userImage
                    ? `data:image/jpeg;base64,${userInfo.userImage}`
                    : user1
                }
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <Button
                color="white"
                className="ms-auto text-white d-lg-none"
                onClick={() => showMobilemenu()}
              >
                <i className="bi bi-x"></i>
              </Button>
            </div>
            <div className="bg-dark text-white p-2 opacity-75">
              {sessionStorage.getItem('userId')}
            </div>
          </div>
        </>
      )}
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={
                  sessionStorage.getItem('userId') === null
                    ? '/login'
                    : navi.href
                }
                className={
                  location.pathname === navi.href
                    ? 'active nav-link py-3'
                    : 'nav-link text-secondary py-3'
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

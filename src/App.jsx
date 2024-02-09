import { useRoutes, BrowserRouter } from 'react-router-dom';
import { LaravelProvider } from './context';
import Navbar from './components/navbar';
import Users from "./app/users";
import Credits from "./app/credits";
import Requests from "./app/requests";
import Modal from './components/modal';
import Home from './app/home';
import Login from './app/login';
import SignUp from './app/login/sign';
import UserEdit from './app/users/[idUser]';
import UserCreate from './app/users/create';
import RequestEdit from './app/requests/[idRequest]';
import RequestCreate from './app/requests/create';
import CreditEdit from './app/credits/[idCredit]';

const user = JSON.parse(localStorage.getItem('account'));

const AppRoutes = () => {
  let routes;

  if (user) {
    
    routes = [
      { path: '/', element: <Home /> },
      user.fk_role !== 3 && user.fk_role !== 4 && { path: '/users', element: <Users /> },
      user.fk_role !== 3 && user.fk_role !== 4 && { path: '/user/:id', element: <UserEdit /> },
      user.fk_role !== 3 && user.fk_role !== 4 && { path: '/users/create', element: <UserCreate /> },
      user.fk_role !== 3 && { path: '/credits', element: <Credits /> },
      user.fk_role !== 3 && { path: '/credit/:id', element: <CreditEdit /> },
      { path: '/credit_requests', element: <Requests /> },
      { path: '/credit_request/:id', element: <RequestEdit /> },
      { path: '/credit_request/create', element: <RequestCreate /> },
    ].filter(route => route);
  } else {
    routes = [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/login/sign', element: <SignUp /> },
    ];
  }

  const navigate = useRoutes(routes);

  return navigate;
};

const App = () => {
  return (
    <LaravelProvider>
      <BrowserRouter>
        <div className='d-flex flex-row'>
          <Navbar />
          <AppRoutes />
          <Modal />
        </div>
      </BrowserRouter>
    </LaravelProvider>
  );
};

export default App;
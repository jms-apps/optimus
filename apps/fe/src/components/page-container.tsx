import { useEffect } from 'react';
import { useCheckLogin } from '../hooks/useCheckLogin';
import { MainMenu } from './main-menu';
import { useNavigate, useLocation } from 'react-router-dom';

interface PageContainerProps {
  isLoggedIn?: boolean;
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  const { token } = useCheckLogin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && location.pathname !== '/login') navigate('/login');
    if (token && location.pathname == '/login') navigate('/my-inventory');
  }, [location.pathname, navigate, token]);

  return (
    <>
      {token ? <MainMenu /> : null}
      <div className="pl-28 pr-6 pt-6 pb-6">{children}</div>;
    </>
  );
}

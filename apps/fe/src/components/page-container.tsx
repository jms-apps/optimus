import { useEffect } from 'react';
import { useCheckLogin } from '../hooks/useCheckLogin';
import { MainMenu } from './main-menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAlertStore } from '../helpers/store';

interface PageContainerProps {
  isLoggedIn?: boolean;
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  const { token } = useCheckLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const { shouldShowAlert, hideAlert, message, severity } = useAlertStore(
    ({ hideAlert, shouldShowAlert, message, severity }) => ({
      shouldShowAlert,
      hideAlert,
      message,
      severity,
    })
  );

  useEffect(() => {
    if (!token && location.pathname !== '/login') navigate('/login');
    if (token && location.pathname == '/login') navigate('/my-inventory');
  }, [location.pathname, navigate, token]);

  return (
    <>
      {token ? <MainMenu /> : null}
      <div className="pl-28 pr-6 pt-6 pb-6">
        {shouldShowAlert ? (
          <Alert
            severity={severity}
            className="fixed top-0"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={hideAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        ) : null}
        {children}
      </div>
      ;
    </>
  );
}

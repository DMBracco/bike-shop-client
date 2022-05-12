import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, createTheme, Toolbar, Typography } from '@mui/material';
import useAuth from './hooks/useAuth';
import { AdminNavbar } from './components/Navbar/AdminNavbar';
import SalesNavbar from './components/Navbar/SalesNavbar';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@emotion/react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.logOut();
    navigate("/login");
  }

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
         <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{ mr: 2, display: 'flex' }}
            component="div"
          >
            MotoShop 
          </Typography>
          {auth.isLoaded &&
            (auth.user ? (
              <>
                {auth.userRole.includes('admin') ? (
                  <AdminNavbar />
                ):(
                  <SalesNavbar />
                )}
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={onLogOut}
                  >
                    Выйти
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link} 
                    to={'/login'}
                  >
                    Войти
                  </Button>

                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link} 
                    to={'/register'}
                  >
                    Регистрация
                  </Button>
                </Box>
              </>
            ))
          }
         </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>

      <AppRoutes />
    </div>
  );
}
export default App;

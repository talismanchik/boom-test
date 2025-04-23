import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useStore from '../../store';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          minWidth: 0,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Система управления доступом
        </Typography>
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 
import { Container, Typography, Box } from '@mui/material';
import UserList from '../components/pages/UserList';

const UsersPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Управление пользователями
        </Typography>
        <UserList />
      </Box>
    </Container>
  );
};

export default UsersPage; 
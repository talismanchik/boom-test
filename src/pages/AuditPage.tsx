import { Container, Typography, Box } from '@mui/material';
import AuditLogs from '../components/pages/AuditLogs';

const AuditPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Журнал аудита
        </Typography>
        <AuditLogs />
      </Box>
    </Container>
  );
};

export default AuditPage; 
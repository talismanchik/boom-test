import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useStore from '../../store';

const AuditLogs = () => {
  const logs = useStore((state) => state.auditLogs);
  const users = useStore((state) => state.users);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Неизвестный пользователь';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Время</TableCell>
            <TableCell>Пользователь</TableCell>
            <TableCell>Действие</TableCell>
            <TableCell>Детали</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{getUserName(log.userId)}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditLogs; 
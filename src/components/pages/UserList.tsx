import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useStore from '../../store';
import { User } from '../../types';
import DeleteDialog from '../common/DeleteDialog';
import EditDialog from '../common/EditDialog';
import { sanitizeInput } from '../../utils/sanitize';

const UserList = () => {
  const users = useStore((state) => state.users);
  const updateUser = useStore((state) => state.updateUser);
  const deleteUser = useStore((state) => state.deleteUser);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    role: '',
    accessLevel: 0,
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      role: user.role,
      accessLevel: user.accessLevel,
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = (updates: Partial<User>) => {
    if (selectedUser) {
      updateUser(selectedUser.id, updates, selectedUser);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setDeleteDialogOpen(false);
    }
  };

  const roles = ['Администратор', 'Аналитик', 'Оператор'];
  const accessLevels = [1, 2, 3, 4, 5];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Уровень доступа</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{sanitizeInput(user.name)}</TableCell>
                <TableCell>{sanitizeInput(user.email)}</TableCell>
                <TableCell>{sanitizeInput(user.role)}</TableCell>
                <TableCell>{user.accessLevel}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleEditSubmit}
        title="Редактировать пользователя"
        initialValues={editForm}
        roles={roles}
        accessLevels={accessLevels}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Подтверждение удаления"
        content={`Вы уверены, что хотите удалить пользователя ${selectedUser ? sanitizeInput(selectedUser.name) : ''}?`}
      />
    </>
  );
};

export default UserList; 
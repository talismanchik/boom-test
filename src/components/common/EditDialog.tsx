import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { sanitizeInput } from '../../utils/sanitize';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (updates: any) => void;
  title: string;
  initialValues: {
    role: string;
    accessLevel: number;
  };
  roles: string[];
  accessLevels: number[];
}

const EditDialog = ({
  open,
  onClose,
  onSave,
  title,
  initialValues,
  roles,
  accessLevels,
}: EditDialogProps) => {
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (field: keyof typeof formValues, value: string | number) => {
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
    setFormValues(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
  };

  const handleSubmit = () => {
    onSave(formValues);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          margin: 2,
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
      keepMounted
      disableScrollLock
    >
      <DialogTitle>{sanitizeInput(title)}</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="dense"
          label="Роль"
          value={formValues.role}
          onChange={(e) => handleChange('role', e.target.value)}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {sanitizeInput(role)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          margin="dense"
          label="Уровень доступа"
          value={formValues.accessLevel}
          onChange={(e) => handleChange('accessLevel', Number(e.target.value))}
        >
          {accessLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog; 
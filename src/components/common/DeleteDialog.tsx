import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
}: DeleteDialogProps) => {
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog; 
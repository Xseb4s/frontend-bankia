import Snackbar from '@mui/material/Snackbar';

const AlertComponent = ({ open, message, handleClose }) => {
  return (


    <Snackbar

      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    />
  );
};

export default AlertComponent;
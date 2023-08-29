import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ModalWindow = ({ modalIsOpen, closeModal, deleteArticle }) => (
  <Dialog
    open={modalIsOpen}
    onClose={closeModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete article</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">Are you sure you want to delete this article?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeModal} autoFocus>
        Cancel
      </Button>
      <Button onClick={deleteArticle}>Delete</Button>
    </DialogActions>
  </Dialog>
);

export default ModalWindow;

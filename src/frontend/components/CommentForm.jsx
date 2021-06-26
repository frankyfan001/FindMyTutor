import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useComments from '../hooks/useComment';

export default function FormDialog({ dialogHooks }) {
  // TODO: Finish add comment
  // const { addComment } = useComments();
  // const handleSubmit = (e) => {
  //   const title = e.target.title.text;
  //   const content = e.target.content.text;

  //   const thumbsUp = 0;
  //   const thumbsDown = 0;

  // }
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <form>
        <Dialog open={dialogHooks.open} onClose={dialogHooks.handleClose} aria-labelledby="form-dialog-title" style={{ width: `${dialogHooks.width}` }}>
          <DialogTitle id="form-dialog-title">New Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add your comment here
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment-id"
              label="Title"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="comment-id"
              label="Comment"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={dialogHooks.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={dialogHooks.handleClose} color="primary" type="submit">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

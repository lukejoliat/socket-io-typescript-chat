import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class FormDialog extends React.Component {
  state = { inputValue: `` };
  handleDialogKeyup = val => this.setState({ inputValue: val });
  formValid = val => (val ? true : false);
  render() {
    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Please type your username.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            required
            error={!this.formValid(this.state.inputValue)}
            value={this.state.inputValue}
            onChange={({ target }) => this.handleDialogKeyup(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.handleSubmit(this.state.inputValue)}
            color="primary"
            disabled={!this.formValid(this.state.inputValue)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

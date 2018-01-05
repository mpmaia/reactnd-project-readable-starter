import React from "react";
import PropTypes from "prop-types";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class ConfirmDialog extends React.Component {

    handleDialogClose(yes) {
        if(yes) {
            this.props.onConfirm();
        } else {
            this.props.onCancel();
        }
    }

    render() {
        const { open, title, question } = this.props;

        return (
            <Dialog
                open={open}
                onClose={() => this.handleDialogClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {question}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleDialogClose(false)} aria-label="No" color="primary" autoFocus>
                        No
                    </Button>
                    <Button onClick={() => this.handleDialogClose(true)} aria-label="Yes" color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    open: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
};

export default ConfirmDialog;

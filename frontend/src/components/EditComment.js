import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from "prop-types";

class EditComment extends React.Component {

    state = {
        open: false,
        author: '',
        body: ''
    };

    requiredMessage = 'This field is required.';

    handleClose(save) {
        if(save) {
            this.savePost();
        } else {
            this.props.onCancel();
        }
    }

    savePost() {

        if(!this.state.author) {
            this.fieldError('author');
            return;
        }

        if(!this.state.body) {
            this.fieldError('body');
            return;
        }

        var commentData = {};

        if(this.props.comment) {
            //editing
            commentData = {
                body: this.state.body,
                id: this.props.post.id
            };
        } else {
            //creating
            commentData = {
                body: this.state.body,
                author: this.state.author,
            };
        }

        this.props.onSave && this.props.onSave(commentData);

        this.clearState();
    }

    clearState() {
        this.setState({
            author: '',
            body: '',
        });
    }

    handleChange(key, value) {
        this.setState({ [key]: value });
        if(!value) {
            this.fieldError(key);
        } else {
            this.setState({ [key + "Error"]: null });
        }
    }

    fieldError(field) {
        this.setState({ [field + "Error"]: this.requiredMessage });
    }

    componentWillReceiveProps(nextProps)
    {
        //Workaround to check if dialog is opening
        if(this.props.open === false && nextProps.open === true)
        {
            if(this.props.comment)
                this.setState(this.props.comment);
        }
    }

    render() {

        const { open, comment } = this.props;

        var creating = true;
        if(comment) {
            creating = false;
        }

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={() => this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {creating?"Create new comment":"Edit comment"}
                    </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Fill the form below to { creating ? "create a new comment" : "edit the comment" }
                        </DialogContentText>

                        {creating &&
                        <div>
                            <TextField
                                margin="normal"
                                id="name"
                                label="Author"
                                type="text"
                                value={this.state.author}
                                error={!!this.state.authorError}
                                helperText={this.state.authorError}
                                onChange={(e) => this.handleChange("author", e.target.value)}
                            />
                        </div>
                        }

                        <TextField
                            id="multiline-static"
                            label="Text"
                            multiline
                            rows="3"
                            margin="normal"
                            fullWidth
                            value={this.state.body}
                            error={this.state.bodyError}
                            helperText={!!this.state.bodyError}
                            onChange={(e) => this.handleChange("body", e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleClose(true)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

EditComment.propTypes = {
    open: PropTypes.bool.isRequired,
    comment: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
};

export default EditComment;

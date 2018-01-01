import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import PropTypes from "prop-types";

class EditPost extends React.Component {

    state = {
        open: false,
        title: '',
        author: '',
        body: '',
        category: ''
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

        if(!this.state.title) {
            this.fieldError('title');
            return;
        }

        if(!this.state.author) {
            this.fieldError('author');
            return;
        }

        if(!this.state.body) {
            this.fieldError('body');
            return;
        }

        if(!this.state.category) {
            this.fieldError('category');
            return;
        }

        var postData = {};

        if(this.props.post) {
            //editing
            postData = {
                title: this.state.title,
                body: this.state.body,
                id: this.props.post.id
            };
        } else {
            //creating
            postData = {
                title: this.state.title,
                body: this.state.body,
                author: this.state.author,
                category: this.state.category
            };
        }

        this.props.onSave && this.props.onSave(postData);

        this.clearState();
    }

    clearState() {
        this.setState({
            title: '',
            author: '',
            body: '',
            category: ''
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
            if(nextProps.post)
                this.setState(nextProps.post);
        }
    }

    render() {

        const { open, categories, post } = this.props;

        var creating = true;
        if(post) {
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
                        {creating?"Create new post":"Edit post"}
                    </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Fill the form below to { creating ? "create a new post" : "edit the post" }
                        </DialogContentText>

                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            label="Title"
                            type="text"
                            fullWidth
                            value={this.state.title}
                            error={!!this.state.titleError}
                            helperText={this.state.titleError}
                            onChange={(e) => this.handleChange("title", e.target.value)}

                        />

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
                                <FormControl fullWidth margin="normal" error={!!this.state.categoryError}>
                                    <InputLabel htmlFor="name">Category</InputLabel>
                                    <Select
                                        value={this.state.category}
                                        onChange={(e) => this.handleChange("category", e.target.value)}
                                        input={<Input name="name" id="name-disabled" />}
                                        label="Category"
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        { categories &&
                                        categories.map(category =>
                                            <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                        )
                                        }
                                    </Select>
                                    <FormHelperText>{this.state.categoryError}</FormHelperText>
                                </FormControl>
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

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};

EditPost.propTypes = {
    open: PropTypes.bool.isRequired,
    post: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func
};

export default connect(mapStateToProps)(EditPost);

import React from "react";
import { connect } from 'react-redux';
import Post from './Post';
import {fetchPosts, deletePost, cancelDeletePost} from '../redux/actions';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    }
});

class PostList extends React.Component {

    handleDialogClose(shouldDelete) {
        if(shouldDelete) {
            this.props.deletePost(this.props.postToDelete);
        } else {
            this.props.cancelDeletePost();
        }
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { posts, classes, postToDelete } = this.props;

        return (
            <div>
                <List className={classes.root}>
                    {
                        posts && posts.map(p => <Post post={p}></Post>)
                    }
                </List>
                <Dialog
                    open={postToDelete}
                    onClose={() => this.handleDialogClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete post?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you really want to delete the post?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleDialogClose(false)} color="primary">
                            No
                        </Button>
                        <Button onClick={() => this.handleDialogClose(true)} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        postToDelete: state.postToDelete
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        deletePost: (post) => dispatch(deletePost(post)),
        cancelDeletePost: () => dispatch(cancelDeletePost())
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostList))

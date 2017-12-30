import React from "react";
import { connect } from 'react-redux';
import Post from './Post';
import {fetchPosts, deletePost, cancelDeletePost} from '../redux/actions';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ConfirmDialog from "./ConfirmDialog";

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
                        posts && posts.map(p => <Post key={p.id} post={p}></Post>)
                    }
                </List>
                <ConfirmDialog title="Delete post?"
                               question="Do you really want to delete the post?"
                               open={postToDelete}
                               onConfirm={() => this.handleDialogClose(true)}
                               onCancel={() => this.handleDialogClose(false)}
                />
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

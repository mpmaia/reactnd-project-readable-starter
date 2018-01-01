import React from "react";
import { connect } from 'react-redux';
import Post from './Post';
import {fetchPosts, deletePost, cancelDeletePost, addPost} from '../../redux/actions';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ConfirmDialog from "../utils/ConfirmDialog";
import {Button} from "material-ui";
import AddIcon from 'material-ui-icons/Add';
import EditPost from "./EditPost";

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    addButton: {
        marginRight: '50px'
    }
});

class PostList extends React.Component {

    state = {
        addingPost: false
    };

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

    createNewPost() {
        this.setState({addingPost: true});
    }

    handleAddPost(post) {
        this.props.addPost(post);
        this.setState({addingPost: false});
    }

    handleCancelAddPost() {
        this.setState({addingPost: false});
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
                <div className={classes.actions}>
                    <div className={classes.flexGrow} />
                    <Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => this.createNewPost()}>
                        <AddIcon />
                    </Button>
                </div>
                <EditPost open={this.state.addingPost}
                          onSave={(p) => this.handleAddPost(p)}
                          onCancel={() => this.handleCancelAddPost(false)}/>
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
        cancelDeletePost: () => dispatch(cancelDeletePost()),
        addPost: (post) => dispatch(addPost(post))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostList))

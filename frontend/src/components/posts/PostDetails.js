import React from "react";
import { connect } from 'react-redux';
import {fetchPost, deleteComment, cancelDeleteComment, addComment, editPost} from '../../redux/actions/index';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import {Button, CircularProgress} from "material-ui";
import AddIcon from 'material-ui-icons/Add';
import blue from 'material-ui/colors/blue';
import Comment from "../comments/Comment";
import ConfirmDialog from "../utils/ConfirmDialog";
import EditPost from "./EditPost";
import EditComment from "../comments/EditComment";
import {sortByKey} from "../../util/compare";
import {deletePost} from "../../redux/actions";
import {withRouter} from "react-router";
import Post from "./Post";

const styles = theme => ({
    card: {
        maxWidth: '100%',
    },
    avatar: {
        backgroundColor: blue[500],
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

class PostDetails extends React.Component {

    state = {
        /**
         * All the state below does not affect any component outside this component. So I decided to keep this state
         * managed internally and do not use redux for it.
         */
        editingPost: false,
        addingComment: false,
        confirmDeletePost: false
    };

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postId);
    }

    handleEditPost(post) {
        this.props.editPost(post);
        this.setState({editingPost: false})
    }

    handleEditComment(comment) {
        this.props.addComment(comment, this.props.post);
        this.setState({addingComment: false})
    }

    handleDeletePost(post) {
        this.props.deletePost(post);
        this.props.history.push('/');
    }

    createNewComment() {
        this.setState({addingComment: true});
    }

    render() {
        const { post, classes, comments, commentToDelete, deleteComment } = this.props;

        if(!post) {
            return (<div><CircularProgress className={classes.progress} /></div>);
        }

        return (
            <div>
                <Post post={post}
                      editPost={() => this.setState({editingPost: true})}
                      deletePost={() => this.setState({confirmDeletePost: true})}
                      showBody={true}/>
                {
                    comments && comments.sort(sortByKey('voteScore')).reverse().map(comment => {
                        return (<Comment key={comment.id} comment={comment}></Comment>)
                    })
                }
                <div className={classes.actions}>
                    <div className={classes.flexGrow} />
                    <Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => this.createNewComment()}>
                        <AddIcon />
                    </Button>
                </div>

                <ConfirmDialog title="Delete comment?"
                               question="Do you really want to delete the comment?"
                               open={!!commentToDelete}
                               onConfirm={() => deleteComment(commentToDelete)}
                               onCancel={() => cancelDeleteComment()}
                />

                <ConfirmDialog title="Delete post?"
                               question="Do you really want to delete the post?"
                               open={this.state.confirmDeletePost}
                               onConfirm={() => this.handleDeletePost(post)}
                               onCancel={() => this.setState({confirmDeletePost: false})}
                />

                <EditPost open={this.state.editingPost}
                          post={post}
                          onSave={(p) => this.handleEditPost(p)}
                          onCancel={() => this.setState({editingPost: false})}/>

                <EditComment open={this.state.addingComment}
                          onSave={(c) => this.handleEditComment(c)}
                          onCancel={() => this.setState({addingComment: false})}/>
            </div>
        );
    }
}

PostDetails.propTypes = {
    classes: PropTypes.object,
    post: PropTypes.object,
    comments: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        post: state.post,
        comments: state.comments,
        commentToDelete: state.commentToDelete
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (id) => dispatch(fetchPost(id)),
        editPost: (post) => dispatch(editPost(post)),
        deletePost: (post) => dispatch(deletePost(post)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        addComment: (comment, post) => dispatch(addComment(comment, post)),
    };
};

export default withStyles(styles)(withRouter((connect(mapStateToProps, mapDispatchToProps)(PostDetails))))

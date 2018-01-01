import React from "react";
import { connect } from 'react-redux';
import {fetchPost, deleteComment, cancelDeleteComment, addComment, editPost} from '../../redux/actions/index';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import {Button, CircularProgress} from "material-ui";
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';
import blue from 'material-ui/colors/blue';
import moment from 'moment';
import Comment from "../comments/Comment";
import ConfirmDialog from "../utils/ConfirmDialog";
import EditPost from "./EditPost";
import EditComment from "../comments/EditComment";
import {sortByKey} from "../../util/compare";

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
        editingPost: false,
        addingComment: false
    };

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.postId);
    }

    confirmCommentRemoval(shouldDelete) {
        if(shouldDelete) {
            this.props.deleteComment(this.props.commentToDelete);
        } else {
            this.props.cancelDeleteComment();
        }
    }

    handleEditPost(post) {
        this.props.editPost(post);
        this.setState({editingPost: false})
    }

    handleEditComment(comment) {
        this.props.addComment(comment, this.props.post);
        this.setState({addingComment: false})
    }

    createNewComment() {
        this.setState({addingComment: true});
    }

    render() {
        const { post, classes, comments, commentToDelete } = this.props;

        if(!post) {
            return (<div><CircularProgress className={classes.progress} /></div>);
        }

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Author" className={classes.avatar}>
                                {post.author.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={post.title}
                        subheader={`${post.author} - ${moment(post.timestamp).format('MMMM D, YYYY')}`}
                    />
                    <CardContent>
                        <Typography component="p">
                            {post.body}
                        </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <IconButton aria-label="Edit Post" onClick={() => this.setState({editingPost: true})}>
                            <ModeEdit />
                        </IconButton>
                        <div className={classes.flexGrow} />
                    </CardActions>
                </Card>
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
                               open={commentToDelete}
                               onConfirm={() => this.confirmCommentRemoval(true)}
                               onCancel={() => this.confirmCommentRemoval(false)}
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
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        cancelDeleteComment: () => dispatch(cancelDeleteComment()),
        addComment: (comment, post) => dispatch(addComment(comment, post)),
        editPost: (post) => dispatch(editPost(post))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostDetails))

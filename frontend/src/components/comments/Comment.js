import React from "react";
import { connect } from 'react-redux';
import {downVoteComment, upVoteComment, editComment} from '../../redux/actions/index';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import blue from 'material-ui/colors/blue';
import moment from 'moment';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Delete from 'material-ui-icons/Delete';
import EditComment from "./EditComment";
import {deleteComment} from "../../redux/actions";
import ConfirmDialog from "../utils/ConfirmDialog";

const styles = theme => ({
    card: {
        maxWidth: '100%',
        margin: '20px',
        left: '50px'
    },
    avatar: {
        backgroundColor: blue[500],
    },
    flexGrow: {
        flex: '1 1 auto',
    },
});

export class Comment extends React.Component {

    state = {
        editingComment: false,
        confirmDelete: null
    };

    handleEditComment(comment) {
        this.props.editComment(comment);
        this.setState({editingComment: false});
    }

    render() {
        const { comment, classes, upVote, downVote, deleteComment } = this.props;

        if(!comment) {
            return (<p></p>);
        }

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Author" className={classes.avatar}>
                                {comment.author.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={comment.author}
                        subheader={`${moment(comment.timestamp).format('MMMM D, YYYY')}`}
                    />
                    <CardContent>
                        <Typography component="p">
                            {comment.body}
                        </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <IconButton aria-label="Edit comment" onClick={() => this.setState({editingComment: true})}>
                            <ModeEdit />
                        </IconButton>
                        <IconButton aria-label="Delete comment" onClick={() => this.setState({confirmDelete: true})}>
                            <Delete />
                        </IconButton>
                        <div className={classes.flexGrow} />
                        <IconButton className={classes.button} aria-label="Down vote comment" onClick={() => downVote(comment)}>
                            <ThumbDown />
                        </IconButton>
                        {comment.voteScore}
                        <IconButton className={classes.button} aria-label="Up vote comment" onClick={() => upVote(comment)}>
                            <ThumbUp />
                        </IconButton>
                    </CardActions>
                </Card>

                <EditComment open={this.state.editingComment}
                             comment={comment}
                             onSave={(c) => this.handleEditComment(c)}
                             onCancel={() => this.setState({editingComment: false})}/>

                <ConfirmDialog title="Delete comment?"
                               question="Do you really want to delete the comment?"
                               open={this.state.confirmDelete}
                               onConfirm={() => deleteComment(comment)}
                               onCancel={() => this.setState({confirmDelete: false})}
                />
            </div>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object,
    comment: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upVote: (comment) => dispatch(upVoteComment(comment)),
        downVote: (comment) => dispatch(downVoteComment(comment)),
        deleteComment: (comment) => dispatch(deleteComment(comment)),
        editComment: (comment) => dispatch(editComment(comment))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Comment))

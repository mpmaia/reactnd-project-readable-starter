import React from "react";
import { connect } from 'react-redux';
import {confirmDeleteComment, downVoteComment, upVoteComment} from '../redux/actions';
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

class Comment extends React.Component {

    render() {
        const { comment, classes, upVote, downVote, deleteComment } = this.props;

        if(!comment) {
            return (<p></p>);
        }

        return (
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
                    <IconButton aria-label="Edit comment">
                        <ModeEdit />
                    </IconButton>
                    <IconButton aria-label="Delete comment" onClick={() => deleteComment(comment)}>
                        <Delete />
                    </IconButton>
                    <div className={classes.flexGrow} />
                    <IconButton className={classes.button} onClick={() => downVote(comment)}>
                        <ThumbDown />
                    </IconButton>
                    {comment.voteScore}
                    <IconButton className={classes.button} onClick={() => upVote(comment)}>
                        <ThumbUp />
                    </IconButton>

                </CardActions>
            </Card>
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
        deleteComment: (comment) => dispatch(confirmDeleteComment(comment))
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Comment))

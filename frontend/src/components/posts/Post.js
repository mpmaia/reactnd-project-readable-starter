import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import {upVotePost, downVotePost} from '../../redux/actions/index';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Card, CardActions, CardContent, CardHeader, Typography} from "material-ui";
import moment from "moment";
import blue from "material-ui/colors/blue";

const styles = theme => ({
    card: {
        maxWidth: '100%',
    },
    avatar: {
        backgroundColor: blue[500],
    },
    spacing: {
        width: '50px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    line: {
        flexBasis: '100%',
    },
    author: {
        fontSize: theme.typography.pxToRem(15),
        height: '16px',
        margin: '4px 0px 0px',
        color: theme.palette.text.secondary,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
});

class Post extends React.Component {

    render() {
        const { classes, post, upVote, downVote, deletePost, editPost, showBody } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Author" className={classes.avatar}>
                            {post.author.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={(<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>)}
                    subheader={`${post.author} - ${moment(post.timestamp).format('MMMM D, YYYY')}`}
                />
                {showBody &&
                    (<CardContent>
                        <Typography component="p">
                            {post.body}
                        </Typography>
                    </CardContent>)
                }
                <CardActions disableActionSpacing>
                    <IconButton aria-label="Edit Post" onClick={() => editPost(post)}>
                        <ModeEdit />
                    </IconButton>
                    <IconButton aria-label="Delete Post" className={classes.button} onClick={() => deletePost(post)}>
                        <Delete />
                    </IconButton>
                    <div className={classes.spacing} />
                    <IconButton aria-label="Down Vote" className={classes.button} onClick={() => downVote(post)}>
                        <ThumbDown />
                    </IconButton>
                    {post.voteScore}
                    <IconButton aria-label="Up Vote" className={classes.button} onClick={() => upVote(post)}>
                        <ThumbUp />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    showBody: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => {
    return {
        upVote: (post) => dispatch(upVotePost(post)),
        downVote: (post) => dispatch(downVotePost(post))
    };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Post));
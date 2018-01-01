import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import {upVotePost, downVotePost, confirmDeletePost} from '../../redux/actions/index';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Card, CardActions, CardHeader} from "material-ui";
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
        const { classes, post, upVote, downVote, deletePost } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Author" className={classes.avatar}>
                            {post.author.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <CardActions disableActionSpacing>
                            <IconButton aria-label="Edit Post" onClick={() => this.setState({editingPost: true})}>
                                <ModeEdit />
                            </IconButton>
                            <IconButton className={classes.button} onClick={() => deletePost(post)}>
                                <Delete />
                            </IconButton>
                            <div className={classes.spacing} />
                            <IconButton className={classes.button} onClick={() => downVote(post)}>
                                <ThumbDown />
                            </IconButton>
                            {post.voteScore}
                            <IconButton className={classes.button} onClick={() => upVote(post)}>
                                <ThumbUp />
                            </IconButton>
                        </CardActions>
                    }
                    title={(<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>)}
                    subheader={`${post.author} - ${moment(post.timestamp).format('MMMM D, YYYY')}`}
                />
            </Card>
        );
    }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        upVote: (post) => dispatch(upVotePost(post)),
        downVote: (post) => dispatch(downVotePost(post)),
        deletePost: (post) => dispatch(confirmDeletePost(post))
    };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Post));
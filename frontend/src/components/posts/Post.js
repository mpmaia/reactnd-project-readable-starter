import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ModeEdit from 'material-ui-icons/ModeEdit';
import Delete from 'material-ui-icons/Delete';
import {upVotePost, downVotePost, confirmDeletePost} from '../../redux/actions/index';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        overflow: 'hidden',
        textOverflow: 'ellipsis',

    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    column: {
        flexBasis: '25%',
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
            <ListItem>
                <div className={classes.column}>
                    <Typography className={classes.heading}><a href="">{post.title}</a></Typography>
                    <Typography className={classes.author}>{post.author}</Typography>
                </div>
                <div className={classes.column}>
                    <Typography className={classes.secondaryHeading}>{post.commentCount} comments</Typography>
                </div>
                <div className={classes.column}>
                    <IconButton className={classes.button} onClick={() => downVote(post)}>
                        <ThumbDown />
                    </IconButton>
                    {post.voteScore}
                    <IconButton className={classes.button} onClick={() => upVote(post)}>
                        <ThumbUp />
                    </IconButton>
                </div>
                <div className={classes.column}>
                    <Typography type="caption">
                        <IconButton className={classes.button} component={Link} to={`/${post.category}/${post.id}`}>
                            <ModeEdit />
                        </IconButton>
                        <IconButton className={classes.button} onClick={() => deletePost(post)}>
                            <Delete />
                        </IconButton>
                    </Typography>
                </div>
            </ListItem>
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
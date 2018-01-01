import React from "react";
import { connect } from 'react-redux';
import Post from './Post';
import {fetchPosts, deletePost, cancelDeletePost, addPost, fetchPostsByCategory, postOrderBy} from '../../redux/actions';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ConfirmDialog from "../utils/ConfirmDialog";
import {Button, FormControl, Input, InputLabel, Select} from "material-ui";
import AddIcon from 'material-ui-icons/Add';
import EditPost from "./EditPost";
import {sortByKey} from "../../util/compare";
import withRouter from "react-router-dom/es/withRouter";

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
    },
    orderBySelect: {
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

    componentWillReceiveProps(newProps) {
        /**
         * React-router does not unmount the component when the params change. This is a workaround to detect
         * the change in the url and dispatch a new request if necessary
         */
        if(this.props.match.params.category != newProps.match.params.category) {
            this.loadPosts(newProps.match.params.category);
        }
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts(category) {
        if(category) {
            this.props.fetchPostsByCategory(category);
        } else {
            this.props.fetchPosts();
        }
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

    handleOrderBy(e) {
        this.props.postOrderBy(e.target.value);
    }

    render() {
        const { posts, classes, postToDelete, postOrderByField } = this.props;

        return (
            <div>
                <div className={classes.actions}>
                    <div className={classes.flexGrow} />
                    <FormControl className={classes.orderBySelect}>
                        <InputLabel>Order By</InputLabel>
                        <Select
                            native
                            value={this.state.orderBy}
                            onChange={(e) => this.handleOrderBy(e)}
                            input={<Input/>}
                        >
                            <option value="voteScore">Score</option>
                            <option value="timestamp">Date</option>
                        </Select>
                    </FormControl>
                </div>
                <List className={classes.root}>
                    {
                        posts && posts
                            .sort(sortByKey(postOrderByField))
                            .reverse()
                            .map(p => <Post key={p.id} post={p}></Post>)
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
        postToDelete: state.postToDelete,
        postOrderByField: state.postOrderBy
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchPostsByCategory: (c) => dispatch(fetchPostsByCategory(c)),
        deletePost: (post) => dispatch(deletePost(post)),
        cancelDeletePost: () => dispatch(cancelDeletePost()),
        addPost: (post) => dispatch(addPost(post)),
        postOrderBy: (key) => dispatch(postOrderBy(key))
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList)))

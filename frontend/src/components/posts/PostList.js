import React from "react";
import { connect } from 'react-redux';
import Post from './Post';
import {
    fetchPosts, deletePost, addPost, fetchPostsByCategory, postOrderBy,
    editPost
} from '../../redux/actions';
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
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
        marginTop: '20px',
        marginRight: '20px'
    },
    orderBySelect: {
        marginRight: '20px',
        width: '100px'
    }
});

class PostList extends React.Component {

    state = {
        addingPost: false,
        editingPost: false
    };

    handleDeletePost() {
        this.props.deletePost(this.state.postToDelete);
        this.setState({postToDelete: null});
    }

    componentWillReceiveProps(newProps) {
        /**
         * React-router does not unmount the component when the params change. This is a workaround to detect
         * the change in the url and dispatch a new request if necessary
         */
        if(this.props.match.params.category !== newProps.match.params.category) {
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

    handleSavePost(post) {

        if(this.state.addingPost) {
            this.props.addPost(post);
        } else {
            this.props.editPost(post);
        }

        this.hideAddEditPostDialog();
    }

    handleEditPost(p) {
        this.setState({editingPost: true, postToEdit: p});
    }

    hideAddEditPostDialog() {
        this.setState({addingPost: false, editingPost: false, postToEdit: null});
    }

    handleOrderBy(e) {
        this.props.postOrderBy(e.target.value);
    }

    render() {
        const { posts, classes, postOrderByField } = this.props;

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
                <div className={classes.root}>
                    {
                        posts && posts
                            .sort(sortByKey(postOrderByField))
                            .reverse()
                            .map(p => <Post key={p.id}
                                            post={p}
                                            showBody={false}
                                            editPost={(p) => this.handleEditPost(p)}
                                            deletePost={(p) => this.setState({postToDelete: p})}></Post>)
                    }
                </div>
                <ConfirmDialog title="Delete post?"
                               question="Do you really want to delete the post?"
                               open={!!this.state.postToDelete}
                               onConfirm={() => this.handleDeletePost()}
                               onCancel={() => this.setState({postToDelete: null})}
                />
                <div className={classes.actions}>
                    <div className={classes.flexGrow} />
                    <Button fab color="primary" aria-label="add" className={classes.addButton} onClick={() => this.createNewPost()}>
                        <AddIcon />
                    </Button>
                </div>
                <EditPost open={this.state.addingPost || this.state.editingPost}
                          post={this.state.postToEdit}
                          onSave={(p) => this.handleSavePost(p)}
                          onCancel={() => this.hideAddEditPostDialog()}/>
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
        postOrderByField: state.postOrderBy
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchPostsByCategory: (c) => dispatch(fetchPostsByCategory(c)),
        deletePost: (post) => dispatch(deletePost(post)),
        addPost: (post) => dispatch(addPost(post)),
        editPost: (post) => dispatch(editPost(post, true)),
        postOrderBy: (key) => dispatch(postOrderBy(key))
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList)))

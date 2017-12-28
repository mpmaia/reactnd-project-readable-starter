import React from "react";
import { connect } from 'react-redux';
import Post from './Post';
import {fetchPosts} from '../redux/actions';
import PropTypes from "prop-types";

class PostList extends React.Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { posts } = this.props;

        return (
            posts && posts.map(p => <Post post={p}/>)
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

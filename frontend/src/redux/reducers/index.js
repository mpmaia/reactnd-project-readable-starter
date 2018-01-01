import { combineReducers } from 'redux';
import {categories} from "./category";
import {posts, post, postToDelete, postOrderBy} from "./post";
import {comments, commentToDelete} from "./comment";

export default combineReducers({
    categories,
    posts,
    post,
    postOrderBy,
    comments,
    postToDelete,
    commentToDelete
});
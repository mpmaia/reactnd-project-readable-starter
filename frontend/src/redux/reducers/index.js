import { combineReducers } from 'redux';
import {categories} from "./category";
import {posts, post, postToDelete} from "./post";
import {comments, commentToDelete} from "./comment";

export default combineReducers({
    categories,
    posts,
    post,
    comments,
    postToDelete,
    commentToDelete
});
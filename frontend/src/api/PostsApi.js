import BaseApi from './BaseApi';
import uuid from 'uuid/v1';

class PostsApi extends BaseApi {

    getPosts() {
        return this.get("/posts");
    }

    getPost(id) {
        return this.get(`/posts/${id}`);
    }

    getPostByCategory(category) {
        return this.get(`/${category}/posts`);
    }

    upVote(post) {
        return this.post(`/posts/${post.id}`, {option: 'upVote'});
    }

    downVote(post) {
        return this.post(`/posts/${post.id}`, {option: 'downVote'});
    }

    deletePost(post) {
        return this.delete(`/posts/${post.id}`);
    }

    addPost(post) {
        if(!post.id)
            post.id = uuid();
        post.timestamp = new Date();
        return this.post('/posts', post);
    }

    validatePost(post, errorCallback) {
        if(!post.title) {
            errorCallback && errorCallback('title');
            return false;
        }

        if(!post.author) {
            errorCallback && errorCallback('author');
            return false;
        }

        if(!post.body) {
            errorCallback && errorCallback('body');
            return false;
        }

        if(!post.category) {
            errorCallback && errorCallback('category');
            return false;
        }

        return true;
    }

    editPost(post) {
        return this.put(`/posts/${post.id}`, post);
    }
}

export default new PostsApi();
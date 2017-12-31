import BaseApi from './BaseApi';
import uuid from 'uuid/v1';

class PostsApi extends BaseApi {

    getPosts() {
        return this.get("/posts");
    }

    getPost(id) {
        return this.get(`/posts/${id}`);
    }

    getPostComments(id) {
        return this.get(`/posts/${id}/comments`);
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
        post.id = uuid();
        return this.post('/posts', post);
    }
}

export default new PostsApi();
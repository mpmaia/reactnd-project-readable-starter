import BaseApi from './BaseApi';

class PostsApi extends BaseApi {

    getPosts() {
        return this.get("/posts");
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
}

export default new PostsApi();
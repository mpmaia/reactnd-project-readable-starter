import BaseApi from './BaseApi';

class PostsApi extends BaseApi {

    getPosts() {
        return this.get("/posts");
    }

    getPostByCategory(category) {
        return this.get(`/${category}/posts`)
    }
}

export default new PostsApi();
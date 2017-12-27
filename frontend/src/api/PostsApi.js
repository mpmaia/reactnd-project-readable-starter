import BaseApi from './BaseApi';

class PostsApi extends BaseApi {
    getPosts() {
        return this.get("/posts");
    }
}
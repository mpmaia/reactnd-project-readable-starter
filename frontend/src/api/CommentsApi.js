import BaseApi from './BaseApi';
import uuid from "uuid/v1";

class CommentsApi extends BaseApi {

    upVote(comment) {
        return this.post(`/comments/${comment.id}`, {option: 'upVote'});
    }

    downVote(comment) {
        return this.post(`/comments/${comment.id}`, {option: 'downVote'});
    }

    deleteComment(comment) {
        return this.delete(`/comments/${comment.id}`);
    }

    addComment(comment, post) {
        comment.id = uuid();
        comment.timestamp = new Date();
        comment.parentId = post.id;
        return this.post('/comments', comment);
    }

    editComment(comment) {
        return this.put(`/comments/${comment.id}`, comment);
    }

    getPostComments(postId) {
        return this.get(`/posts/${postId}/comments`);
    }
}

export default new CommentsApi();
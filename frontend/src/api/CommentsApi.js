import BaseApi from './BaseApi';

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
}

export default new CommentsApi();
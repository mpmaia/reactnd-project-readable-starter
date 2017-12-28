import BaseApi from './BaseApi';

class CategoriesApi extends BaseApi {
    getCategories() {
        return this.get("/categories");
    }
}

export default new CategoriesApi();
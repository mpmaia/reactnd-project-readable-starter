import axios from "axios/index";
import AxiosMock from 'axios-mock-adapter';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import initialState from '../../redux/initialState';

const mockStore = configureStore([thunk]);

export function getMockAxios() {
    var mock = new AxiosMock(axios);
    return mock;
}

export function getMockStore() {
    return mockStore(initialState);
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';
import {MemoryRouter} from "react-router";
import { Provider } from 'react-redux';
import {getMockAxios, getMockStore} from "../utils/mocks";
import {mount} from "enzyme";
import initMockDom from "../utils/mockDom";
import {ERROR} from "../../redux/actions/error";

initMockDom();

describe('<APP>',()=>{
    var store, mock;

    beforeAll( () => {
        mock = getMockAxios();
    });

    beforeEach(()=>{
        store = getMockStore();
        mock.onGet('/categories').reply(200, {categories: []});
        mock.onGet('/posts').reply(200, []);
    });


    it('renders without crashing', () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <App classes={{}}/>
                </MemoryRouter>
            </Provider>);

        expect(wrapper.find("Toolbar Typography").text()).toEqual('Udacity Readable');
    });

    it('renders errorMsg', () => {
        store = getMockStore({errorMsg: 'ERROR', posts:[]});
        var push = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <App classes={{}}/>
                </MemoryRouter>
            </Provider>);

        expect(wrapper.find("Snackbar").text()).toEqual('ERROR');
        wrapper.find("Snackbar").props().onClose();

        const expectedActions = [
            { type: ERROR, msg: null},
        ];

        expect(store.getActions()).toEqual(expectedActions)

    });
});



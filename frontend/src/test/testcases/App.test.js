import React from 'react';
import ReactDOM from 'react-dom';
import {App} from '../../components/App';
import {MemoryRouter} from "react-router";
import { Provider } from 'react-redux';
import {getMockAxios, getMockStore} from "../utils/mocks";

describe('<APP>',()=>{
    var store, mock;

    beforeEach(()=>{
        mock = getMockAxios();
        store = getMockStore();
        mock.onGet('/categories').reply(200, {categories: []});
        mock.onGet('/posts').reply(200, []);
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <MemoryRouter>
                    <App classes={{}}/>
                </MemoryRouter>
            </Provider>, div);
    });

});



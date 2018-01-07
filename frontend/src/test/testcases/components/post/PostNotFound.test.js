import {mount, shallow} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import initMockDom from "../../../utils/mockDom";
import PostNotFound from "../../../../components/posts/PostNotFound";

initMockDom();

describe('PostNotFound component tests', () => {

    it('renders without errors', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PostNotFound />
            </MemoryRouter>
        );
        expect(wrapper.find("CardHeader").text()).toEqual('Post not found');
    });
});
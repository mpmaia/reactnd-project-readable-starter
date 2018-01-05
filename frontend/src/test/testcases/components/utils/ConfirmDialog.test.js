import {mount, shallow} from "enzyme";
import React from "react";
import initMockDom from "../../../utils/mockDom";
import ConfirmDialog from "../../../../components/utils/ConfirmDialog";

initMockDom();

describe('ConfirmDialog component tests', () => {

    var onConfirm, onCancel;
    var title="TITLE";
    var question="QUESTION";


    beforeEach(()=>{
        onConfirm = jest.fn();
        onCancel = jest.fn();
    });

    it('renders and simulate clicks', () => {
        const wrapper = mount(
            <ConfirmDialog title={title} question={question} open={true} onCancel={onCancel} onConfirm={onConfirm}/>
        );

        expect(wrapper.find("DialogContentText").text()).toEqual(question);
        expect(wrapper.find("DialogTitle").text()).toEqual(title);
    });

    it('renders and simulate click on No', () => {
        const wrapper = mount(
            <ConfirmDialog title={title} question={question} open={true} onCancel={onCancel} onConfirm={onConfirm}/>
        );

        wrapper.find("Button[aria-label=\"No\"]").simulate('click');
        expect(onCancel.mock.calls.length).toEqual(1);

    });

    it('renders and simulate click on No', () => {
        const wrapper = mount(
            <ConfirmDialog title={title} question={question} open={true} onCancel={onCancel} onConfirm={onConfirm}/>
        );

        wrapper.find("Button[aria-label=\"Yes\"]").simulate('click');
        expect(onConfirm.mock.calls.length).toEqual(1);

    });
});
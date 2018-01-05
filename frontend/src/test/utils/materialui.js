
export function fillTextField(wrapper, label, value, multiline=false) {
    const input = wrapper.find(`TextField[label=\"${label}\"] ` + (multiline?'textarea':'input'));
    input.getDOMNode().value = value;
    input.simulate('change', input);
    return input;
}

export function selectField(wrapper, label, value) {
    const input = wrapper.find(`Select[label=\"${label}\"] SelectInput`);
    input.props().onChange({target: {value: value}});
    return input;
}

export default function pluralize(value, label) {
    if(value===1) {
        return label;
    } else {
        return label + 's';
    }
}
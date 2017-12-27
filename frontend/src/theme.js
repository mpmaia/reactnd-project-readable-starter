import { createMuiTheme } from 'material-ui/styles';
import {red, grey} from 'material-ui/colors';

const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: grey,
    },
    status: {
        danger: 'orange',
    },
});

export default theme;
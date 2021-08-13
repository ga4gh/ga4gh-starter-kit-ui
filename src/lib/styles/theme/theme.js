import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2f75bb'
        },
        secondary: {
            // main: '#4faedc'
            main: '#9f7ab0'
        },
        error: {
            main: '#e34a3b'
        },
        warning: {
            main: '#f9a533'
        },
        success: {
            main: '#8bc53f'
        }
    },
    
    typography: {
        fontFamily: '"Helvetica Neue"'
    }
});

export default theme;
import { makeStyles } from '@material-ui/core/styles';

const deleteButtonStyles = makeStyles((theme) => ({
    div: {
        display: 'inline-block'
    },
    root: {
        marginLeft: 10,
        marginRight: 10,
        color: theme.palette.error.main,
        borderColor: theme.palette.error.light
    }
}));

export default deleteButtonStyles;

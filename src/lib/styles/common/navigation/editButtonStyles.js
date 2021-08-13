import { makeStyles } from '@material-ui/core/styles';

const editButtonStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 10,
        marginRight: 10,
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.light
    }
}));

export default editButtonStyles;

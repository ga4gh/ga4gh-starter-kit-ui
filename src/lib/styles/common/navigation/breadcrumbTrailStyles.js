import { makeStyles } from '@material-ui/core/styles';

const breadcrumbTrailStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '25px'
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'underline'
    }
}));

export default breadcrumbTrailStyles;

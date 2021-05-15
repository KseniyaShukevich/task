import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    input: {
      width: '60%',
      [theme.breakpoints.down(870)]: {
        width: '50%',
      },
      [theme.breakpoints.down(660)]: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
    },
    box: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down(660)]: {
        flexWrap: 'wrap',
      },
    },
    boxButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '35%',
      [theme.breakpoints.down(870)]: {
        width: '45%',
      },
      [theme.breakpoints.down(660)]: {
        width: '100%',
      },
    },
    buttonLeft: {
      marginRight: theme.spacing(1),
    },
    buttonRight: {
      marginLeft: theme.spacing(1),
    },
    results: {
      height: '70vh',
      overflowY: 'scroll',
      border: '2px solid silver',
      borderRadius: 5,
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
    }
  }),
);

export default useStyles;
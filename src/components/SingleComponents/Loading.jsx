import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '24rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '5rem auto',
        '& > *': {
            backgroundColor: ` #a3a3a3`,
        }
    },
    writing_skeleton: {
        marginTop: '3rem'
    }
});

export default function Animations() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Skeleton width="100%" height={150} className={classes.writing_skeleton} />
            <Skeleton width='80%' />
            <Skeleton animation={false} width='100%' />
            <Skeleton animation="wave" width='85%' />
            <Skeleton animation="wave" width='90%' />
            <Skeleton width="75%" />
            <Skeleton width="100%" height={80} />

        </div>
    );
}

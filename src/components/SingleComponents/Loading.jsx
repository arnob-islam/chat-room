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
            <Skeleton width='40%' />
            <Skeleton animation={false} width='50%' />
            <Skeleton animation="wave" width='45%' />
            <Skeleton animation="wave" width='40%' />
            <Skeleton width="30%" />
            <Skeleton width="100%" height={40} className={classes.writing_skeleton} />

        </div>
    );
}

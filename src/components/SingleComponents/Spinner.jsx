import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';



export default function Spinner() {


    return (
        <div className={'spinner-wrapper'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
            <CircularProgress color="secondary" />
        </div>
    );
}

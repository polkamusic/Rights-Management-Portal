import React from 'react';
import img from './PolkaMusic.svg'
import { Box } from '@material-ui/core';

const logo = (props) => {
    return (
        <>     
            <img style={{ width: '100%', height: `${props?.height || 27 }` }} src={img} />
        </>
    );
}
export default logo;
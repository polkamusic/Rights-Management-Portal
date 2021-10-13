import React from 'react';
import img from './PolkaMusic.svg'

const logo = (props) => {
    return (
        <>     
            <img style={{ width: '100%', height: `${props?.height || 45 }px` }} src={img} />
        </>
    );
}
export default logo;
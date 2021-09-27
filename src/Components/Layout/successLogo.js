import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Box } from '@material-ui/core';

const SuccessLogo = (props) => {
    return (

        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

            <Box>
                <CheckCircleOutlineIcon />
            </Box>

            {
                props.text
            }

        </Box>
    )
}

export default SuccessLogo
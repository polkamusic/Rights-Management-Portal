import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Box } from '@material-ui/core';

const ErrorLogo = (props) => {
    return (

        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

            <Box>
                <ErrorOutlineIcon />
            </Box>

            {
                props.text
            }

        </Box>
    )
}

export default ErrorLogo
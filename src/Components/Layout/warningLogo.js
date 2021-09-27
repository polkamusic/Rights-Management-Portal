import React from 'react';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import { Box } from '@material-ui/core';

const WarningLogo = (props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>

            <Box>
                <WarningOutlinedIcon />
            </Box>

            {
                props.text
            }

        </Box>
    )



}

export default WarningLogo
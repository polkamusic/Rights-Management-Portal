import React from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Box } from '@material-ui/core';

const InfoLogo = (props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>

            <Box>
                <InfoOutlinedIcon />
            </Box>

            {
                props.text
            }

        </Box>
    )



}

export default InfoLogo
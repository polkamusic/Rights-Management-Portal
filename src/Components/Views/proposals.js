import React, { useEffect, useState } from 'react';
import { Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';

const Proposals = (props) => {
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="proposal changes tab"
            >
                <Tab label="CRM" />
                <Tab label="Master" />
                <Tab label="Composition" />
                <Tab label="Other Contracts" />
            </Tabs>
        </>
    )
}

export default Proposals

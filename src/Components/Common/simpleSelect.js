import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: "95%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    inputLabel: {
        color: "#d3d3d3",
        "&.Mui-focused": {
            color: "#f50057"
        }
    }
}));

// props, inputPropsId, inputPropsName, inputLabel, value, onChange, children
const SimlpeSelect = (props) => {
    const classes = useStyles();

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={props.inputPropsId} className={classes.inputLabel}>
                    {props.inputLabel}
                </InputLabel>
                <Select
                    disableUnderline
                    value={props.value}
                    onChange={props.onChange}
                    inputProps={{
                        name: props.inputPropsName,
                        id: props.inputPropsId,
                    }}
                >
                    {props.children}
                </Select>
            </FormControl>
        </>
    )
}

export default SimlpeSelect

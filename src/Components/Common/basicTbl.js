import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const BasicTbl = (props) => {
    const TableCell = withStyles({
        root: {
            borderBottom: props?.borderBottom || "none"
        }
    })(MuiTableCell);

    const useStyles = makeStyles({
        table: {
            minWidth: props?.minWidth || 325,
        },
    });

    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>{(props.headers && props.headers?.length > 0) && props.headers[0]}</TableCell> */}
                        {(props.headers && props.headers?.length > 0)
                            && props.headers.map((header) => (
                                <TableCell align={props?.headerAlign || "left"}>{header}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(props.rows && props.rows.length > 0) && props.rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                <Box fontStyle="italic">
                                    <Typography variant="body2">
                                        {row[props.headNames[0]]}
                                    </Typography>
                                </Box>
                            </TableCell>
                            {
                                props.headNames.map((headName, idx) =>
                                (<TableCell align={props?.cellAlign || "left"}>
                                    <Box fontStyle="italic">
                                        <Typography variant="body2">
                                            {row[props.headNames[(idx + 1)]]}
                                        </Typography>
                                    </Box>
                                </TableCell>))
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BasicTbl

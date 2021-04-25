import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: 175,
    },
   
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const FileUpload = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const classes = useStyles();

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
            


                
                <Paper variant="outlined" square className={classes.root}>
                    <CloudUploadIcon style={{ fontSize: 128, marginLeft: "24px" }} color="secondary" />
                    <Typography component="h6" variant="body1" align="center">
                        Select file to upload
        </Typography>
                    </Paper>


                    {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Or drag 'n' drop mp3 or wav file</p>
                }
            </div>
        </div>
    )
}

export default FileUpload

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Link,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 175,
  }
});

const FileUpload = (props) => {

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    // if (acceptedFiles[0]) setUploadedFilename(acceptedFiles[0]?.name || '')
    if (props && props.nodeFormikVal) {
      console.log('accepted mp3 files', acceptedFiles);
      props.nodeFormikVal.setFieldValue('ipfsMp3WavFile', acceptedFiles[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: 'audio/mpeg, audio/mp3, audio/wav'
  });

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      {
        !props.nodeFormikVal.values.ipfsMp3WavFileUrl &&

        (<div {...getRootProps()}>
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
        </div>)
      }



      <Typography component="h4" variant="h4" align="left">
        {props.nodeFormikVal?.values?.ipfsMp3WavFile?.name || ""}
      </Typography>

      {
        props.nodeFormikVal?.values?.ipfsMp3WavFileUrl &&
        <Box p={0}>
          <Typography variant="subtitle1">
            <Link href={props.nodeFormikVal?.values?.ipfsMp3WavFileUrl} target="_blank" rel="noopener noreferrer">
              {props.nodeFormikVal?.values?.ipfsMp3WavFileUrl || ''}
            </Link>
          </Typography>
          <audio controlsList="nodownload" controls>
            <source src={props.nodeFormikVal?.values?.ipfsMp3WavFileUrl || ''} type="audio/mpeg" />
          </audio>
        </Box>
      }

    </Box>
  )
}

export default FileUpload

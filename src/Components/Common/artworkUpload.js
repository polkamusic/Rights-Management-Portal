import React from 'react'
import Button from '@material-ui/core/Button';

const ArtworkUpload = () => {
    return (
        <>
            <Button
                variant="contained"
                component="label"
            >
                Upload Artwork
  <input
                    type="file"
                    hidden
                />
            </Button>
        </>
    )
}

export default ArtworkUpload

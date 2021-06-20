import React, {useState} from 'react'
import Button from '@material-ui/core/Button';

const ArtworkUpload = (props) => {
    // const [artworkFilename, setArtworkFilename] = useState('')

    return (
        <>
            <Button
                variant="contained"
                component="label"
            >
                Upload Artwork
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) => {
                        // setArtworkFilename(event?.currentTarget?.files[0]?.name || '')
                        if (props && props.nodeFormikVal)
                            props.nodeFormikVal
                                .setFieldValue("ipfsArtworkFile", event.currentTarget.files[0]);
                    }}
                />
            </Button>
            {'  '}
            <span>
                {/* {artworkFilename} */}
                {
                    props?.nodeFormikVal?.values?.ipfsArtworkFile?.name || ''
                }
            </span>
        </>
    )
}

export default ArtworkUpload

import React from 'react'
import Chip from '@mui/material/Chip';


const MediaInfo = ({ userMedia, setuserMedia, mediaLoading }) => {

    const handlMediaDelete = (e) => {
        const filterName = userMedia.name.filter((info, index) => index !== e)
        const filterFile = userMedia.file.filter((info, index) => index !== e)
        setuserMedia({
            ...userMedia,
            name: filterName,
            file: filterFile
        })
    }


    return (
        <>
            <div className="media_loading_" style={{ width: `${mediaLoading}%` }}>

            </div>
            <div className={userMedia.name.length !== 0 ? 'media_wrapper sldfjswr' : 'sldfjswr'}>
                {userMedia.name.length !== 0 && userMedia.name.map((e, index) => {
                    return <Chip label={e} key={index} variant="outlined" onDelete={() => handlMediaDelete(index)} />
                })}
            </div>
        </>

    )
}

export default MediaInfo

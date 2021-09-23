import React from 'react'
import { styled } from '@mui/material/styles';
import { BiImageAdd } from "react-icons/bi";
import IconButton from '@mui/material/IconButton';

const Input = styled('input')({
    display: 'none',
});




const UploadImages = ({ userMedia, setuserMedia }) => {

    const HandleUploadFile = (e) => {
        const itCanNotBeExist = [`video/mp4`, `audio/mpeg`]
        const file = e.target.files[0]
        if (file && !itCanNotBeExist.includes(file.type)) {
            if (file.name.length > 14) {
                setuserMedia({
                    name: [...userMedia.name, file.name.slice(0, 14)],
                    file: [...userMedia.file, file]
                })
            } else {
                setuserMedia({
                    ...userMedia,
                    name: [...userMedia.name, file.name],
                    file: [...userMedia.file, file]
                })
            }
        }
    }



    return (
        <>
            <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" className='upload_photo_input' onChange={HandleUploadFile} />
                <IconButton color="primary" aria-label="upload picture" component="span" className='icon__button' >
                    <BiImageAdd />
                </IconButton>
            </label>
        </>
    )
}

export default UploadImages

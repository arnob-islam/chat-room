import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { UseGlobalContext } from './../Provider/Anonymus'
import { FiLogIn } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase/config';


export default function AccountMenu() {

    const { userisok } = UseGlobalContext()


    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const HandleLogOut = () => {
        auth.signOut()
    }


    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        {auth.currentUser ? <img src={`${auth.currentUser.photoURL}`} className='img_wrapper' alt='user' style={{ width: `2rem`, borderRadius: '100%' }} /> : <Avatar sx={{ width: 32, height: 32 }}></Avatar>}
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {userisok ? (<div>
                    <MenuItem>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <Link to='/only/admin/login'>

                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                        </Link>
                        Admin
                    </MenuItem>
                    <MenuItem >
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>

                    <MenuItem onClick={HandleLogOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>

                </div>)
                    :
                    (<MenuItem>
                        <Link to='/login/'>
                            <ListItemIcon>
                                <FiLogIn className="login_Icon" />
                            </ListItemIcon>
                        </Link>

                        Log in
                    </MenuItem>)}


            </Menu>
        </React.Fragment>
    );
}

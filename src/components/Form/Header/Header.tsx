import React, {useEffect, useState} from "react";
import {AccountCircle, LibraryBooks, Settings, Group, ExitToApp, ShoppingCart, CardGiftcard} from '@mui/icons-material'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import './style.css'

import { verifyToken } from "../../../utils/helpers/tokenSettings";
import { getUserName } from "../../../utils/helpers/userSettingsSaving";
import { clearLocalStorage } from "../../../utils/helpers/clearLocalStorage";

interface UserRoleProps {
    onChangeUserRole: () => void
}
const Header = ({onChangeUserRole}: UserRoleProps) => {
    const [isDropdownVisible, onChangeDropdownVisibility] = useState<Boolean>(false)
    const [userName, setUserName] = useState<string | null>()
    const [isUserLoggedIn, onChangeUserLoggedInStatus] = useState<Boolean>()
    const navigate = useNavigate()

    useEffect(() => {
        setUserName(getUserName())
        onChangeUserLoggedInStatus(verifyToken())
    }, [isUserLoggedIn, verifyToken()])

    const logOut = () => {
        onChangeUserLoggedInStatus(false)
        clearLocalStorage()
        onChangeUserRole()
        navigate('/')
    }
    return (
        <div className="header">
            {!isUserLoggedIn 
                ? <Link to='/private'><Button className="login-btn" variant="contained">Login</Button></Link>
                : <div className="user-info-wrapper">
                <span className="user-info"  onClick={() => onChangeDropdownVisibility(!isDropdownVisible)}>
                    <AccountCircle/>
                    <p className="user-name">{userName}</p>
                </span>
                {isDropdownVisible && 
                    <div className="user-settings-dropdown">
                        <Paper sx={{ width: 220, maxWidth: '100%', marginTop: '-10px' }}>
                            <MenuList>
                                <MenuItem>
                                    <ListItemIcon>
                                        <LibraryBooks fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>My Library</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Group fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>My Communities</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <CardGiftcard fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Wishlist</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ShoppingCart fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Cart</ListItemText>
                                </MenuItem>
                                <Link to='/settings'>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Settings</ListItemText>
                                    </MenuItem>
                                </Link>
                                <Divider />
                                <MenuItem onClick={logOut}>
                                    <ListItemIcon>
                                        <ExitToApp fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Log Out</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Paper>
                    </div>
                }
            </div>
            }
           
        </div>
    )
}

export default Header
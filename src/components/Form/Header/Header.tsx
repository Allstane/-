import React, {useState} from "react";
import {AccountCircle, LibraryBooks, Settings, Group, ExitToApp, ShoppingCart, CardGiftcard} from '@mui/icons-material'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import './style.css'

import { verifyToken, logOutAction } from "../../../utils/helpers/tokenSettings";

const Header = () => {
    const [isDropdownVisible, onChangeDropdownVisibility] = useState<Boolean>(false)
    
    return (
        <div className="header">
            {!verifyToken() 
                ? <Link to='/private'><Button className="login-btn" variant="contained">Login</Button></Link>
                : <div className="user-info-wrapper">
                <span className="user-info"  onClick={() => onChangeDropdownVisibility(!isDropdownVisible)}>
                    <AccountCircle/>
                    <p className="user-name">Stanislav Kapinus</p>
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
                                <MenuItem>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Settings</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => logOutAction()}>
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
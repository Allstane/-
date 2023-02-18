import React, {useState, useEffect} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {LibraryBooks, Groups, LocalLibrary, House, Security} from '@mui/icons-material'
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { adminRoles } from "../../../utils/constants/roles";
import { getUserRole} from "../../../utils/helpers/userSettingsSaving";
import './style.css'

const LayoutWrapper = ({children, isRoleToggled}) => {
    const [isAdminRole, checkIsAdminRole] = useState(false)
    const [userRole, onChangeUserRole] = useState(getUserRole())
    useEffect(() => {
        onChangeUserRole(getUserRole())
        checkIsAdminRole(adminRoles.includes(userRole))
    }, [userRole, isRoleToggled])
    return (
        <div className='layout-wrapper'>
            <Header onChangeUserRole={onChangeUserRole}/>
            <div className="side-menu">
                <List className="menu-list">
                    <ListItem disablePadding>
                        <Link to='/'>
                            <ListItemButton>
                            <ListItemIcon>
                                <House />
                            </ListItemIcon>
                            <ListItemText primary="Main Page" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/'>
                            <ListItemButton>
                            <ListItemIcon>
                                <LibraryBooks />
                            </ListItemIcon>
                            <ListItemText primary="Library" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/'>
                            <ListItemButton>
                            <ListItemIcon>
                                <LocalLibrary />
                            </ListItemIcon>
                            <ListItemText primary="Authors" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem disablePadding>
                        <Link to='/'>
                            <ListItemButton>
                            <ListItemIcon>
                                <Groups />
                            </ListItemIcon>
                            <ListItemText primary="Communities" />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    {isAdminRole && <ListItem disablePadding>
                        <Link to='/private/main'>
                            <ListItemButton>
                            <ListItemIcon>
                                <Security />
                            </ListItemIcon>
                            <ListItemText primary="Private" />
                            </ListItemButton>
                        </Link>
                    </ListItem>}
                </List>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default LayoutWrapper
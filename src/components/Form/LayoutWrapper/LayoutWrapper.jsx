import React from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {LibraryBooks, Groups, LocalLibrary, House, Security} from '@mui/icons-material'
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { verifyToken } from "../../../utils/helpers/tokenSettings";
import './style.css'

const LayoutWrapper = ({children}) => {
    return (
        <React.Fragment className='layout-wrapper'>
            <Header/>
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
                        <ListItemButton>
                        <ListItemIcon>
                            <LibraryBooks />
                        </ListItemIcon>
                        <ListItemText primary="Library" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <LocalLibrary />
                        </ListItemIcon>
                        <ListItemText primary="Authors" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            <Groups />
                        </ListItemIcon>
                        <ListItemText primary="Communities" />
                        </ListItemButton>
                    </ListItem>
                    {verifyToken() && <ListItem disablePadding>
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
        </React.Fragment>
    )
}

export default LayoutWrapper
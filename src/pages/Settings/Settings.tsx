import React, {useEffect, useState} from "react";
import { Container, Button, ButtonGroup, Input, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUserName, getUserRole } from "../../utils/helpers/userSettingsSaving";
import { getLanguages } from "../../utils/constants/language";
import './style.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Settings = () => {
    const [userRole, setUserRole] = useState<String | null>(null)
    const [userName, setUserName] = useState<String | null>(null)
    const [mainLanguage, setMainLanguage] = useState<any>(null)
    const [languages, setLanguages] = useState<any>([])
    const [isEditMode, toggleEditMode] = useState<Boolean>(false)
    const handleChangeLanguage = (value: any) => {
        const selectedValue = languages.find((lang: { value: string; }) => lang.value === value) || languages[0]
        setMainLanguage(selectedValue)
    }

    useEffect(() => {
        setUserRole(getUserRole())
        setUserName(getUserName())
        getLanguages().then(res => {
            const result = res.data.map((lang: any) => {return {
                ...lang,
                title: lang.english,
                value: lang.english
            }})
           setLanguages(result) 
        })
    }, [])
    useEffect(() => {
        setMainLanguage(languages[0])
    }, [languages])
    return (
        <Container component="main" className="settings">
            <TableContainer component={Paper} sx={{ maxWidth: 1000, minWidth: 700 }}>
            <Table aria-label="settings">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center" colSpan={2} className='settings-header'>
                        Settings
                        <span className="settings-action-wrapper">
                            {isEditMode 
                                ? <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button color="success" onClick={() => toggleEditMode(!isEditMode)}>Save</Button>
                                    <Button color="error" onClick={() => toggleEditMode(!isEditMode)}>Cancel</Button>
                                </ButtonGroup >
                                : <Button variant="contained" onClick={() => toggleEditMode(!isEditMode)}>Edit</Button>
                            }
                        </span>
                    </StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            Name:
                        </StyledTableCell>
                    <StyledTableCell align="left">
                        {isEditMode 
                            ? <Input defaultValue={userName} onChange={(event) => setUserName(event.target.value)}/>
                            : userName
                        }
                    </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            Role:
                        </StyledTableCell>
                    <StyledTableCell align="left">{userRole}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            Language:
                        </StyledTableCell>
                    <StyledTableCell align="left">
                        {isEditMode 
                            ? <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="select-language">Lang</InputLabel>
                                <Select
                                    labelId="select-language"
                                    label="Age"
                                    onChange={(e) => handleChangeLanguage(e.target.value)}
                                >
                                    {languages.map((lang: { value: string; title: string }, idx: React.Key ) => (
                                        <MenuItem key={idx} value={lang.value}>{lang.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            : mainLanguage?.title
                        }
                    </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
            </TableContainer>
        </Container>
    )
}

export default Settings
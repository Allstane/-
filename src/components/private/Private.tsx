import React from 'react'
import {instance} from './../AxiosInstance'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {User} from './../data/User'
import {useNavigate} from "react-router-dom";
import { saveToken as _saveToken } from '../../utils/helpers/tokenSettings';
import { adminRoles } from '../../utils/constants/roles'
import { saveUserName, saveUserRole } from '../../utils/helpers/userSettingsSaving'
import './../App.css'

const theme = createTheme()

export default function Private({toggleIsRoleToggled, isRoleToggled}: any) {
  const navigate = useNavigate()

  function saveToken(userName: string, userPass: string) {
    const user: User = {id: 0, login: userName, password: userPass, token: '', role: ''}
    const json = JSON.stringify(user)
    instance.post<User>('/auth', json, {headers: {'Content-Type': 'application/json'}})
    .then(u => { 
      _saveToken(u.data.token)
      saveUserName(u.data.login)
      saveUserRole(u.data.role)
      return u.data.role
    }).then((res) => {
      toggleIsRoleToggled(!isRoleToggled)
      if (adminRoles.includes(res)) {
        navigate('/private/main')
      } else {
        navigate('/')
      }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userName = data.get('login')
    const userPass = data.get('password')
    saveToken(String(userName), String(userPass))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}


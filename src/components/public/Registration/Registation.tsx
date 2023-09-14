import React from 'react'
import { instance } from '../../AxiosInstance'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {useNavigate} from "react-router-dom";
import { RegData } from '../../data/User'
import PasswordValidation from '../../helpers/passwordValidation'

const Registration = () => {
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const login: FormDataEntryValue | null = data.get('login')
    const firstname = data.get('firstName')
    const surname = data.get('surname')
    const email = data.get('email')
    const userPass = data.get('password')
    const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const emailValidation = emailRegExp.test(String(email).toLowerCase());
    const reqData: RegData = {
      login,
      firstname,
      surname,
      password: userPass,
      email,
      tg: null, 
      favbooks: null, 
      origlang: null, 
      langs: null, 
      location: null, 
    }
    const passValidation = true //PasswordValidation(userPass)
    if (emailValidation && firstname && login && surname && passValidation) {
      instance.post<RegData>('/reg', JSON.stringify(reqData), {headers: {'Content-Type': 'application/json'}})
        .then(() => {
          alert('Successfully created!')
          navigate('/private')
        })
    } else if (!emailValidation) {
      alert('Invalid email. Please enter correct email.')
    } else if (!firstname) {
      alert('Please enter your first name.')
    } else if (!login) {
      alert('Please enter your login.')
    } else if (!surname) {
      alert('Please enter your last name.')
    } else if (!passValidation) {
      alert('Invalid password. Please enter correct password.')
    }
  }
  return (
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
          <Typography component="h1" variant="h5">
            Registration
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
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              name="surname"
              autoComplete="surname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
              helperText="Password must have at list one upper letter, lower letter, digits and minimum length is 8"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
  )
}

export default Registration
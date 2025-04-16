import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

const CardStyled = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  backgroundColor: '#1A233A', // Dark card background matching homepage
  color: '#FFFFFF', // White text for contrast
  boxShadow:
    'hsla(220, 30%, 5%, 0.3) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.2) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A233A',
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.3) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    background: 'linear-gradient(135deg, #6B46C1, #4C51BF, #3182CE)', // Purple to blue gradient
    backgroundRepeat: 'no-repeat',
  },
}));

export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState('');
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);
  const navigate = useNavigate();

  const validateInputs = (email, password) => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!validateInputs(email, password)) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/chat');
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setServerError(err.response.data.message || 'Invalid email or password.');
      } else if (err.request) {
        setServerError('No response from server. Please check your connection.');
      } else {
        setServerError('An error occurred. Please try again.');
      }
    }
  };

  const handleForgotPasswordOpen = () => {
    setOpenForgotPassword(true);
  };

  const handleForgotPasswordClose = () => {
    setOpenForgotPassword(false);
  };

  return (
    <>
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="center">
        <CardStyled variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: '#FFFFFF' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: '#CBD5E0' }}>Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ input: { color: '#FFFFFF' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4A5568' }, '&:hover fieldset': { borderColor: '#6B46C1' }, '&.Mui-focused fieldset': { borderColor: '#6B46C1' } } }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ color: '#CBD5E0' }}>Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ input: { color: '#FFFFFF' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4A5568' }, '&:hover fieldset': { borderColor: '#6B46C1' }, '&.Mui-focused fieldset': { borderColor: '#6B46C1' } } }}
              />
            </FormControl>
            {serverError && (
              <Typography color="error" variant="body2" sx={{ color: '#F56565' }}>
                {serverError}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" sx={{ color: '#6B46C1', '&.Mui-checked': { color: '#6B46C1' } }} />}
              label="Remember me"
              sx={{ color: '#CBD5E0' }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: '#6B46C1', '&:hover': { backgroundColor: '#553C9A' } }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleForgotPasswordOpen}
              variant="body2"
              sx={{ color: '#A78BFA', '&:hover': { color: '#8A4AF3' }, alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider sx={{ borderColor: '#4A5568', '&::before, &::after': { borderColor: '#4A5568' } }}>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              sx={{ color: '#FFFFFF', borderColor: '#4A5568', '&:hover': { borderColor: '#6B46C1', backgroundColor: 'rgba(107, 70, 193, 0.1)' } }}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              sx={{ color: '#FFFFFF', borderColor: '#4A5568', '&:hover': { borderColor: '#6B46C1', backgroundColor: 'rgba(107, 70, 193, 0.1)' } }}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: 'center', color: '#CBD5E0' }}>
              Don't have an account?{' '}
              <Link href="/signup" variant="body2" sx={{ color: '#A78BFA', '&:hover': { color: '#8A4AF3' } }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardStyled>
        <Dialog open={openForgotPassword} onClose={handleForgotPasswordClose}>
          <DialogTitle sx={{ color: '#FFFFFF', backgroundColor: '#1A233A' }}>Forgot Password</DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1A233A' }}>
            <DialogContentText sx={{ color: '#CBD5E0' }}>
              Enter your email address to receive a password reset link.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="forgot-email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              sx={{ input: { color: '#FFFFFF' }, label: { color: '#CBD5E0' }, '& .MuiInput-root': { '&::before': { borderColor: '#4A5568' }, '&:hover::before': { borderColor: '#6B46C1' } } }}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#1A233A' }}>
            <Button onClick={handleForgotPasswordClose} sx={{ color: '#A78BFA' }}>Cancel</Button>
            <Button onClick={() => alert('Password reset link sent!')} sx={{ color: '#A78BFA' }}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </SignInContainer>
    </>
  );
}
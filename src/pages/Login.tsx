import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  fetchLoginAsync,
  getAuthStatus,
  getAuthError
} from '../features/login/loginSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik, ErrorMessage } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';


const Login: React.FC = () => {
  const navigate = useNavigate();

  // This hook returns a reference to the dispatch function from the Redux store.   
  const authStatus = useAppSelector(getAuthStatus);
  const authError = useAppSelector(getAuthError);
  //const store = useStore();  not recomended
  const dispatch = useAppDispatch();

  // то что делали в componentDidMount()/componentDidUpdate()
  //useEffect(() => {
  //      //dispatch(getPosts());
  //}, [dispatch]);

  useEffect(() => {
    // автоматический переход при успешной авторизации
    if(authStatus=='auth')
      navigate('/app/dashboard', { replace: true });      
  });


  return (
    <>      
      <Helmet>      
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >        
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '0000',
              password: 'Zero4'
            }}
            /*validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}*/    
            
            onSubmit = { async (values, actions) => {
              const user = { userId: values.email, password: values.password, key: undefined, refreshKey: undefined, error_message: undefined, roles: undefined };
                            
              await dispatch(fetchLoginAsync(user));
              //.then(() => {
                //console.log(store.getState()); not recomended
                if(authError!==undefined) 
                  actions.setFieldError('email', authError);         
              //});        
              //dispatch(incrementAsync(incrementValue))
              //var user : User;
              //user = useSelector((state: AppState) => state.user);
              //if(user.key!='' )             
              
              //navigate('/app/dashboard', { replace: true });  
              //actions.setFieldError('email', 'message email error');       
            }}              
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      //onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      //onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>                
                <TextField
                  error={Boolean(authError!==undefined)}
                  fullWidth
                  helperText={authError}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  //type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;

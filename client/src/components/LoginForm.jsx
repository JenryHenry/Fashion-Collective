// see SignupForm.js for comments
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import {
          Button,
          Card,
          Container,
          Flex,
          Heading,
          Link,
          Text,
          TextField,
        } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';

const LoginForm = () => {

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Container maxWidth='500px'>     
      <Heading size='7' mb='3' align='center'>Login</Heading>
      <Card>
        <Form.Root onSubmit={handleFormSubmit}>
          <Form.Field name='email'>
              <Text as='div' size='5' mb='3' weight='bold'>
                Email
              </Text>
              <TextField.Root
                type='email'
                placeholder='Enter your email'
                autoComplete='email'
                id='email'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
          </Form.Field>
          <Form.Field>
            <Text as='div' size='5' mt='3' mb='3' weight='bold'>
              Password
            </Text>
            <TextField.Root
              type='password'
              placeholder='Enter your password'
              autoComplete='current-password'
              name='password'
              id='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </Form.Field>

          {/* Buttons: Create account (switch to signup) and Login */}
          <Flex gap='4' mt='4' justify='end'>
            {/* If this button is clicked, it will switch to the signup page */}
            <Link href='/signup'>
            <Button
              variant='soft'
              type='button'
            >
              Create account
            </Button>
            </Link>
            <Button
              disabled={!(userFormData.email && userFormData.password)}
              type='submit'
              variant='success'>
              Login
            </Button>
          </Flex>
        </Form.Root>        
      </Card>
    </Container>
  );
};

export default LoginForm;
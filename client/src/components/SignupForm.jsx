import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import {
          Button,
          Card,
          Container,
          Flex,
          Heading,
          Text,
          TextField,
        } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';

const SignupForm = ({ switchForm }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser] = useMutation(ADD_USER);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <Container size='2'>
      <Heading size='7' mb='3' align='center'>
        Sign Up
      </Heading>
      <Card>
        <Form.Root onSubmit={handleFormSubmit}>
          <Form.Field name='username'>
            <Text as='div' size='5' mb='3' weight='bold'>
              Username
            </Text>
            <TextField.Root
              type='username'
              placeholder='Enter username'
              name='username'
              id='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
          </Form.Field>
          <Form.Field mb='3'>
            <Text as='div' size='5' mt='3' mb='3' weight='bold'>
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
              placeholder='Enter password'
              autoComplete='new-password'
              name='password'
              id='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </Form.Field>

          {/* Buttons: I have an account (switch to login) and Create account (signup) */}
          <Flex gap='4' mt='4' justify='end'>
            {/* If this button is clicked, it will switch to the login form */}
            <Button
              variant='soft'
              onClick={switchForm}
              type='button'
            >
              I have an account
            </Button>
            <Button
              disabled={
                !(
                  userFormData.username &&
                  userFormData.email &&
                  userFormData.password
                )
              }
              type='submit'
              variant='success'
            >
              Create account
            </Button>
          </Flex>
        </Form.Root>
      </Card>
    </Container>
  );
};

export default SignupForm;
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));


it('The email and password input boxes can be filled correctly', () => {
  const handleLogin = jest.fn();
  const handleSignUp = jest.fn();
  const { getByPlaceholderText } = render(<Login handleLogin={handleLogin} handleSignUp={handleSignUp} />);

  const emailInput = getByPlaceholderText('Email');
  fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'email' } });
  expect(emailInput.getAttribute('value')).toBe('test@example.com');

  const passwordInput = getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'password', name: 'password' } });
  expect(passwordInput.getAttribute('value')).toBe('password');
});

it('Displays an error message when email or password is missing', () => {
  const handleLogin = jest.fn();
  const handleSignUp = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Login handleLogin={handleLogin} handleSignUp={handleSignUp} />);

  const emailInput = getByPlaceholderText('Email');
  fireEvent.change(emailInput, { target: { value: '', name: 'email' } });

  const passwordInput = getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: '', name: 'password' } });

  const submitButton = getByText('Log In');
  fireEvent.click(submitButton);

  const errorMessage = getByText('All fields are required');
  expect(errorMessage).toBeDefined();
});
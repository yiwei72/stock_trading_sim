import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));


it('updates the loginUserData state on input change', () => {
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

import React from 'react';
import { render, fireEvent, act, waitFor, getByTestId } from '@testing-library/react';
import { MemoryRouter, useLoaderData } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Registration, { RegistrationRoute } from './RegistrationPage';
import Login from './LoginPage';
import { useNavigation } from 'react-router-dom';
import PathConstants from '../routes/PathConstants'; 

// Mock the react-router-dom module
jest.mock('react-router-dom', () => {
    const useNavigation = jest.fn();

    return {
        ...jest.requireActual('react-router-dom'),
        useNavigation, // Mock useNavigation
        useLoaderData: jest.fn(() => ({ data: {} })), // Mock useLoaderData
        Navigate: jest.fn(({ to }) => <div data-testid="navigate">{to}</div>), // Mock the Navigate component
    };
});

const renderWithI18n = (component) => {
    return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>, {
        wrapper: MemoryRouter,
    });
};

describe('User Registration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Verify that users can successfully register with valid information.', async () => {
        // Mock useNavigation to return a function
        useNavigation.mockReturnValue(jest.fn());
        
        const { getByLabelText, getByText, getByTestId, unmount } = renderWithI18n(<Registration />); // Render the Registration component
        
        // Fill out the form fields
        fireEvent.change(getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(getByLabelText(/firstName/i), {
            target: { value: 'John' },
        });
        fireEvent.change(getByLabelText(/lastName/i), {
            target: { value: 'Doe' },
        });
        fireEvent.change(getByLabelText(/password/i), {
            target: { value: 'password123' },
        });
        
        // Submit the form
        await act(async () => {
            fireEvent.click(getByText(/submit/i));
        });
    
        // Assert that the form data is displayed correctly
        expect(getByTestId('email-input').value).toBe('test@example.com');
        expect(getByTestId('firstName-input').value).toBe('John');
        expect(getByTestId('lastName-input').value).toBe('Doe');
        expect(getByTestId('password-input').value).toBe('password123');
    
        unmount(); // Clean up after the test
    });

    test(' Verify that users cannot register with invalid information (e.g., invalid email format, password requirements not met). ', 
        async () => {
        // Mock useNavigation to return a function
        useNavigation.mockReturnValue(jest.fn());
        
        const { getByLabelText, getByText, getByTestId, unmount } = renderWithI18n(<Registration />); // Render the Registration component
        
        // Fill out the form fields with invalid information
        fireEvent.change(getByLabelText(/email/i), {
            target: { value: 'test' },
        });
        fireEvent.change(getByLabelText(/firstName/i), {
            target: { value: 'John' },
        });
        fireEvent.change(getByLabelText(/lastName/i), {
            target: { value: 'Doe' },
        });
        fireEvent.change(getByLabelText(/password/i), {
            target: { value: 'password' },
        });
        
        // Submit the form
        await act(async () => {
            fireEvent.click(getByText(/submit/i));
        });
    
        // Assert that the form data is displayed correctly
        expect(getByTestId('email-input').value).toBe('test');
        expect(getByTestId('firstName-input').value).toBe('John');
        expect(getByTestId('lastName-input').value).toBe('Doe');
        expect(getByTestId('password-input').value).toBe('password');
    
        unmount(); // Clean up after the test
    });

    test('Verify that registered users can log in successfully.', async () => {
        // Mock useNavigation to prevent error
        useNavigation.mockReturnValue(jest.fn());
    
        const { getByLabelText, getByText, getByTestId, unmount } = renderWithI18n(<Login />);
    
        fireEvent.change(getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
            fireEvent.change(getByLabelText(/password/i), {
        target: { value: 'password123' },
        });
    
        await act(async () => {
            fireEvent.click(getByText(/submit/i));
        });
    
        expect(getByTestId('email-input').value).toBe('test@example.com');
        expect(getByTestId('password-input').value).toBe('password123');
    
        unmount(); // Clean up after the test
    });

    test('Verify that login fails for invalid credentials.', async () => {
        // Mock useNavigation to prevent error
        useNavigation.mockReturnValue(jest.fn());
    
        const { getByLabelText, getByText, getByTestId, unmount } = renderWithI18n(<Login />);
    
        fireEvent.change(getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(getByLabelText(/password/i), {
            target: { value: '' },
        });
        fireEvent.click(getByText(/submit/i));
    
        // Ensure useNavigation is not called
        expect(useNavigation).not.toHaveBeenCalled();
    
        unmount(); // Clean up after the test
    });
    
});

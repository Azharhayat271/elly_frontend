import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Auth from '../components/Auth';
import { AuthProvider } from '../AuthContext';
import { authAPI } from '../api';

jest.mock('../api');

const mockLogin = authAPI.login as jest.MockedFunction<typeof authAPI.login>;
const mockRegister = authAPI.register as jest.MockedFunction<typeof authAPI.register>;

describe('Auth Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    render(
      <AuthProvider>
        <Auth />
      </AuthProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('switches to register form when clicking register link', () => {
    render(
      <AuthProvider>
        <Auth />
      </AuthProvider>
    );

    const registerLink = screen.getByText('Register');
    fireEvent.click(registerLink);

    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  });

  it('submits login form with valid data', async () => {
    mockLogin.mockResolvedValue({
      token: 'test-token',
      user: { id: '1', username: 'testuser' },
    });

    render(
      <AuthProvider>
        <Auth />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });
});

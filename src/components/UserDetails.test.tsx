
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRouterBasic, renderWithRouter } from '../test/utils';
import UserDetails from './UserDetails';
import userEvent from '@testing-library/user-event';
import { UserList } from './UserList';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ 'userId': '1' }),
        useLocation: () => {
            return { state: { user: { name: 'Leanne Graham', username: 'Bret' } } }
        }
    }
});

describe("UserDetail component", () => {
    it('display the user details', async () => {
        renderWithRouterBasic(<UserDetails />, { route: '/users/1' });

        expect(screen.getByRole('heading')).toHaveTextContent("User Details");
        expect(screen.getByText('Name: Leanne Graham')).toBeInTheDocument();
    });

    it('contains link to go back to user list page', async () => {
        renderWithRouter(<UserDetails />, [{ path: '/users', element: <UserList /> }]);

        expect(screen.getByRole('link')).toHaveTextContent("Back to user list");
        await userEvent.click(screen.getByRole('link'));
        expect(screen.getByRole('heading')).toHaveTextContent("User List");
    })
})
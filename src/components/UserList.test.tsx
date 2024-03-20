
import { describe, it, expect } from 'vitest';
import { UserList } from './UserList';
import { screen } from '@testing-library/react';
import { renderWithRouterBasic, renderWithRouter } from '../test/utils';
import userEvent from '@testing-library/user-event';
import UserDetails from './UserDetails';

describe("UserList component", () => {
    it('loads the user list', async () => {
        renderWithRouterBasic(<UserList />);
        expect(await screen.findByRole('heading')).toHaveTextContent("User List");
        expect(await screen.findAllByRole('row')).toHaveLength(3);
        expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
        expect(await screen.findByText("Ervin Howell")).toBeInTheDocument();
    });

    it('routes to user details when row is clicked', async () => {
        renderWithRouter(<UserList />, [
            {
                path: "/users/:userId",
                element: <UserDetails />
            },
        ]);
        const user = userEvent.setup()

        await user.click(await screen.findByText("Leanne Graham"));

        //routed to user details
        expect(await screen.findByRole('heading')).toHaveTextContent("User Details");
        expect(screen.getByText('Name: Leanne Graham')).toBeInTheDocument();
    });

    // it("handle api error scenario", async () => {
    //     render(<UserList />);

    //     expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    //     expect(await screen.findByText("Something went wrong. Please try again later.")).toBeInTheDocument();
    // });
})
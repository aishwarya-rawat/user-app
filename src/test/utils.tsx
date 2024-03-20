import { BrowserRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
import { render } from "@testing-library/react";
import { ReactNode, isValidElement } from "react";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

export const renderWithRouterBasic = (ui: ReactNode, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  }
}


export function renderWithRouter(children: any, routes = [] as { path: string; element: JSX.Element; }[]) {
  const options = isValidElement(children)
    ? { element: children, path: "/" }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return render(<RouterProvider router={router} />);
}
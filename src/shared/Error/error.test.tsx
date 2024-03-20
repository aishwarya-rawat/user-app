import { describe, it, expect } from 'vitest';
import { Error } from './Error';
import { render, screen } from '@testing-library/react'

describe("Error component", () => {
    it('loads the Error with default message', () => {
        render(<Error />);
        expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
    });

    it('loads the Error with custom message', () => {
        render(<Error message="test custom message" />);
        expect(screen.getByText('test custom message')).toBeInTheDocument();
    });

})
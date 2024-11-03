import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from './ui';

describe('Headere', () => {
  it('render header', () => {
    render(<Header />);

    const links = screen.getAllByTestId('navLink');

    expect(links.length).toBe(4);
  });
});
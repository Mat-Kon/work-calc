import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from './ui';

describe('Header', () => {
  it('render header', async () => {
    const { getByText } = render(<Header />);

    expect(getByText('BC')).toBeInTheDocument();
    // expect(getByText('Login')).toBeInTheDocument();
  });
});
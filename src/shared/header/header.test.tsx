import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from './ui';

describe('Header', () => {
  it('render header', async () => {
    const { getByText } = render(<Header />);

    expect(getByText('logo')).toBeInTheDocument();
    expect(getByText('login')).toBeInTheDocument();
  });
});
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from './ui';
import { SessionProvider } from 'next-auth/react';

describe('Header', () => {
  it('render header', async () => {
    const { getByText } = render(

      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );


    expect(getByText('BC')).toBeInTheDocument();
    // expect(getByText('Login')).toBeInTheDocument();
  });
});
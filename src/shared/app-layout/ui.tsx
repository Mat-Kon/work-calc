import dynamic from 'next/dynamic';

interface Props {
  children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const Header = dynamic(() => import('../header').then((mod) => mod.Header), {
    ssr: false,
  });

  return (
    <>
      <Header />
      <main>{children}</main>
      <div>footer</div>
    </>
  );
};

import Link from 'next/link';

interface Props {
  type: 'link' | 'button';
  text: string;
  href?: string;
  className?: string;
}

export const BaseBtn: React.FC<Props> = ({ type, href, text, className }) => {
  return type === 'link' ? (
    <Link className={`${className ?? ''}`} href={href ?? ''}>
      {text}
    </Link>
  ) : (
    <button className={`${className ?? ''}`}>{text}</button>
  );
};

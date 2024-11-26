import Link from 'next/link';

interface Props {
  typeBtn: 'link' | 'button';
  text: string;
  href?: string;
  className?: string;
}

export const BaseBtn: React.FC<Props> = ({ typeBtn, href, text, className }) => {
  return typeBtn === 'link' ? (
    <Link className={`${className ?? ''}`} href={href ?? ''}>
      {text}
    </Link>
  ) : (
    <button className={`${className ?? ''}`}>{text}</button>
  );
};

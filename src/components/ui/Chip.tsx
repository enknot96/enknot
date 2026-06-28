type Props = {
  children: React.ReactNode;
};

/** 技術スタックなどのタグ。 */
export default function Chip({ children }: Props) {
  return <span className="chip">{children}</span>;
}

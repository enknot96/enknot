type Props = {
  children: React.ReactNode;
  className?: string;
};

/** セクション見出しの上に置く小さなラベル。アニメーションが必要な箇所では
 *  motion.p に className="eyebrow" を直接付与する。 */
export default function Eyebrow({ children, className = "" }: Props) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

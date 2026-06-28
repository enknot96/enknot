import Container from "./Container";

type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

/** 一貫した縦余白を持つセクション（中央寄せ Container 付き）。 */
export default function Section({ children, id, className = "" }: Props) {
  return (
    <section id={id} className={`w-full bg-paper py-28 md:py-40 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

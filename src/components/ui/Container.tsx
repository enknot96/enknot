type Props = {
  children: React.ReactNode;
  /** 詳細ページ用の狭い幅（900px）。既定は 1200px。 */
  narrow?: boolean;
  className?: string;
};

export default function Container({ children, narrow = false, className = "" }: Props) {
  return (
    <div
      className={`mx-auto w-full px-8 ${narrow ? "max-w-[900px]" : "max-w-[1200px]"} ${className}`}
    >
      {children}
    </div>
  );
}

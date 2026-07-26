// 内部の「戻る」ナビゲーションを示す矢印アイコン。currentColor を継承する。
export default function ArrowLeftIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M12 19 5 12 12 5" />
    </svg>
  );
}

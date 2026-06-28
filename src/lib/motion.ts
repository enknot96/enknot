// 全コンポーネント共通のアニメーション定義
import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** 下からフェードイン。custom に遅延（秒）を渡す。 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

/** 子要素を順番に表示するコンテナ。 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/** stagger の子（単語などの登場）。 */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * 即時アニメーション用の props ヘルパー（initial/animate を直接展開）。
 * 例: <motion.div {...fadeUpProps(0.2)} />
 */
export const fadeUpProps = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

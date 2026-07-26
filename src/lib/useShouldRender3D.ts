"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

// デスクトップ幅 かつ prefers-reduced-motion: reduce でない場合のみ3Dを許可。
// 初期値はfalse固定（SSR/初回マウント時は常に打ち文字を表示し、CLSを防ぐ）。
export function useShouldRender3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setEnabled(!reduceMotionQuery.matches && window.innerWidth >= MOBILE_BREAKPOINT);
    };

    evaluate();
    reduceMotionQuery.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);

    return () => {
      reduceMotionQuery.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return enabled;
}

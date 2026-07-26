"use client";

import { useEffect, useState } from "react";

// prefers-reduced-motion: reduce でない場合のみ3Dを許可(画面幅は問わない)。
// 初期値はfalse固定(SSR/初回マウント時は常に打ち文字を表示し、CLSを防ぐ)。
export function useShouldRender3D() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setEnabled(!reduceMotionQuery.matches);
    };

    evaluate();
    reduceMotionQuery.addEventListener("change", evaluate);

    return () => {
      reduceMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return enabled;
}

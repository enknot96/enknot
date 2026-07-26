"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onError: () => void;
};

type State = {
  hasError: boolean;
};

// GLB読み込み失敗・WebGL初期化失敗などをここで捕捉し、打ち文字フォールバックへ戻す。
export default class Hero3DErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

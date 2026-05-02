import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-bl from-gray-400 to-blue-500/90">
          <div
            role="alert"
            className="flex flex-col items-center gap-4 rounded-xl bg-white/10 p-8 text-white backdrop-blur"
          >
            <span className="material-symbols-outlined text-5xl text-red-300" aria-hidden="true">
              error
            </span>
            <p className="text-lg">Ocurrió un error inesperado. Recarga la página.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

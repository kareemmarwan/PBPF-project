import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  resetKey?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Unhandled render error:", error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="text-center max-w-md space-y-6">
            <div className="space-y-2">
              <h1 dir="rtl" className="text-2xl sm:text-3xl font-bold text-foreground">
                عذراً، حدث خطأ غير متوقع
              </h1>
              <h2 dir="ltr" className="text-lg font-semibold text-foreground">
                Sorry, an unexpected error occurred
              </h2>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground leading-relaxed">
              <p dir="rtl">يمكنك إعادة المحاولة أو العودة إلى الصفحة الرئيسية.</p>
              <p dir="ltr">You can retry, or return to the home page.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <span dir="rtl" className="block">إعادة المحاولة</span>
                <span dir="ltr" className="block text-xs opacity-80">Try again</span>
              </button>
              <a
                href="/"
                className="px-6 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                <span dir="rtl" className="block">الصفحة الرئيسية</span>
                <span dir="ltr" className="block text-xs opacity-70">Home page</span>
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

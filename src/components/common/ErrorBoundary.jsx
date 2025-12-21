import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold text-red-600">Something went wrong.</h1>
                    <pre className="mt-4 p-4 bg-gray-100 text-left overflow-auto text-sm">
                        {this.state.error && this.state.error.toString()}
                    </pre>
                    <button onClick={() => window.location.href = '/'} className="mt-4 btn btn-primary">
                        Go Home
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

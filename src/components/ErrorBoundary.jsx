import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console (or your error reporting service)
    console.error('Error caught by error boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      // Check if not in production mode
      if (process.env.NODE_ENV !== 'production') {
        // Display error details
        return (
          <div className="alert alert-danger">
            <h4>Oops! Something went wrong.</h4>
            <p>{error && error.toString()}</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </div>
        );
      } else {
        // In production mode, display a more user-friendly message
        return (
          <div className="alert alert-danger">
            <h4>Oops! Something went wrong.</h4>
            <p>We're sorry, but an error occurred while rendering this component.</p>
          </div>
        );
      }
    }

    // Render the child components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;

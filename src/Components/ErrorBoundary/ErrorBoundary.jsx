import { Component } from "react";

import ErrorMassage from "../ErrorMassage/ErrorMassage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    //static getDelivedStateFromError(error) {
    //    return { error: true };
    //}

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) return <ErrorMassage/>
        return this.props.children;
    }
}

export default ErrorBoundary;
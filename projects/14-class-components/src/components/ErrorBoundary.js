import {Component} from 'react'

/**
 * ErrorBoundary is a class component which is used to catch the error in child components
 */
class ErrorBoundary extends Component {

    constructor(){
        super();
        this.state = {hasError: false};
    }
    
    // tirggrerd when error occurred in child components
    componentDidCatch(err){
        this.setState({hasError: true});
    }

    render(){
        // if error occurred , then show user a user-friendly page
        if(this.state.hasError){
            return <p> Something went wrong </p>
        }
        return this.props.children;
    }

}

export default ErrorBoundary;
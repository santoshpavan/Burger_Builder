import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
    // this is a anonymous class and hence no name
    return class extends Component {
        state = {
            error: null
        }

        // axios interceptor for Error Handling
        componentDidMount() {
            // have to return something. Hence the returns for req, res and error
            axios.interceptors.request.use(req => {
                // when we send a request. We want error to be cleared
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }
        
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (  
            <Aux>
                <Modal show={this.state.error}
                    backdrop_clicked={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            );
        }
    }
}

export default WithErrorHandler;
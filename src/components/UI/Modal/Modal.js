import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    // this should update only when the "show" changes
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render () {
        return(
            <Aux>
                <Backdrop show={this.props.show} backdrop_clicked={this.props.backdrop_clicked}/>
                <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
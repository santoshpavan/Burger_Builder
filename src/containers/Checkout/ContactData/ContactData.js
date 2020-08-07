import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from  './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        // don't send request. don't reload the page
        event.preventDefault();
        
        // start the loading
        this.setState({loading: true});
        //dummy data for the order details
        const order =  {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Santosh',
                address: {
                    street: 'Test Adress',
                    zipcode: '123',
                    country: 'US'
                },
                email: 'santosh@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                // stop the loading and close the modal
                this.setState({loading: false});
                // redirecting
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" onClick={this.orderHandler}>ORDER</Button>
        </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
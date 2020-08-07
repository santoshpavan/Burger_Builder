import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigation_items = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem label={"Burger Builder"} link="/" exact/>
        <NavigationItem label={"Checkout"} link="/"/>
    </ul>
);

export default navigation_items;
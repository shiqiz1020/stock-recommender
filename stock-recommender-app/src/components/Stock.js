
// Stock information
// "star" button to save in shopping cart

// Konjac

import React from 'react';
import { useState, useEffect } from 'react';

import './Stock.css';

// function Stock(props) {

// }


class Stock extends React.Component{
    constructor(props){
        super(props);

        // this.removeStock = this.removeStock.bind(this);
        this.markCheckedOut = this.markCheckedOut.bind(this);

        this.state = {
            backgroundColor: '',
            is_starred: false
        }
        
    }

    removeStock(){
        this.props.removeStock(this.props.id);
    }

    markCheckedOut(){
        if (this.state.backgroundColor === ''){
            this.setState({ backgroundColor: 'rgb(144,238,144, 0.5)', is_starred: true });
            if (!this.props.starredNames.includes(this.props.symbol) ) {
                var tempStarredNames = this.props.starredNames.concat([this.props.symbol]);
                this.props.setStarredNames(tempStarredNames);
                console.log("StarredNames:", tempStarredNames);
                localStorage.setItem("starredNames", JSON.stringify(tempStarredNames));
            }
        } else {
            this.setState({backgroundColor: '', is_starred: false});
            if (this.props.starredNames.includes(this.props.symbol) ) {
                const index = this.props.starredNames.indexOf(this.props.symbol);
                var tempStarredNames = this.props.starredNames.slice()
                if (index > -1) {
                    tempStarredNames.splice(index, 1);
                    this.props.setStarredNames(tempStarredNames);
                    localStorage.setItem("starredNames", JSON.stringify(tempStarredNames));
                }
                console.log("StarredNames:", tempStarredNames);
            }
        }

    }

    render(){
        return (
            <div className='task-container'>
                <div className='task-container-background' style={{backgroundColor: this.state.backgroundColor}}>
                    <div className='task-term-container'>
                        <h2 className='task-term' >{this.props.symbol}</h2>
                        <h4 className='task-quality' >quality: {this.props.quality}</h4>
                        <h4 className='task-volatility' >volatility: {this.props.volatility.toFixed(2)}</h4>
                    </div>
                    <div className='buttons-container'>
                        <button className='done-button' onClick={this.markCheckedOut}>v</button>
                        {/* <button className='delete-button' onClick={this.removeStock}>x</button> */}
                    </div>
                </div>
            </div>
        );
    }

}

export default Stock;


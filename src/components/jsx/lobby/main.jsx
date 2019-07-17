import React from "react";
import SimplePicker from 'simplepicker';
import "simplepicker/dist/simplepicker.css";

// import { store } from 'components/redux/store/mainstore';
import 'components/styles/lobby.css';
export class LobbyView extends React.Component {
    constructor (props) {
        super(props);
        this.myPicker = new SimplePicker();
        console.log(this.myPicker.selectedDate.getTime()); // default date
        this.open = this.open.bind(this);
    }
    open () {
        this.myPicker.open();
        document.querySelector('.simpilepicker-date-picker').classList.add('simplepicker-animate');
    }
    componentDidMount () {
        this.myPicker.on('submit', (date, readableDate) => {
            console.log(date.getTime());
            console.log(readableDate);
            console.log(this.myPicker.selectedDate.getTime());
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.open}>Тык</button>
            </div>
        );
    }
}
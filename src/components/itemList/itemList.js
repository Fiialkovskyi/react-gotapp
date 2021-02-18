import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../sevices/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {
    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    renderItems(arr) {
        return arr.map((item) => {
            return (
                <li 
                    key={item.id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(item.id)}>
                    {item.name}
                </li>
            )
        });
    }

    render() {
        const {charList} = this.state;

        if (this.state.error) {
            return <ErrorMessage />
        }

        if (!charList) {
            return (
                <Spinner />
            )
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
import React, {Component} from 'react';
import gotService from '../../sevices/gotService';
import ErrorMessage from '../errorMessage';
import './charDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};
export default class CharDetails extends Component {
    gotService = new gotService();

    state = {
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    updateChar() {
        const {itemId} = this.props;
        if (!itemId) {
            return
        }

        const {getData} = this.props;

        getData(itemId)
            .then((item) => {
                this.setState({
                    item
                })
            })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }

        const{item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}
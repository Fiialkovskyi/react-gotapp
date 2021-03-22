import React, {Fragment, useState, useEffect} from 'react';
import './randomChar.css';
import gotService from '../../sevices/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

function RandomChar () {
    let service = new gotService();

    const [char, setChar] = useState(0);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const onCharLoaded = char => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        service.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, 1500);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}


const View = ({char}) => {
    const {name, gender, born, died, culture} = char;

    return (
        <Fragment>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </Fragment>
    )
}

export default RandomChar;
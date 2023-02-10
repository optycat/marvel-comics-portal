import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import MarvelServise from '../../../servises/MarvelServise';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';
import Spinner from '../../Spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [active, setActive] = useState(null);
    const [offset, setOffset] = useState(210);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const marvelServise = new MarvelServise();

    useEffect(() => {
        onRequest();
        props.onCharSelected(chars[0]);
    }, []);

    const onRequest = (offset) => {
        onNewItemsLoading();
        marvelServise
            .getChars(offset)
            .then((res) => onCharsLoaded(res, offset))
            .catch(onErrorOcupeted);
    }

    const onCharsLoaded = (additionalChars, offsetProp) => {
        let ended = additionalChars.length < 9 ? true : false;

        setChars(chars => [...chars, ...additionalChars]);
        setLoading(loading => false);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onNewItemsLoading = () => setNewItemsLoading(true);

    const onErrorOcupeted = () => {
        setError(true);
        setLoading(false);
    }

    const handleClick = (id) => {
        setActive(active => id);
        props.onCharSelected(id);
    }

    if (error) return <ErrorMassage />
    if (loading) return <Spinner />
    return (
        <div className="char__list">
            <ul className="char__grid">
                {
                    chars.map((char, i) => {
                        const { name, thumbnail, id } = char;

                        return (
                            <li className={active === id ? "char__item char__item_selected" : "char__item"}
                                key={id}
                                onClick={() => handleClick(id)}>
                                <img src={thumbnail} alt={name} />
                                <div className="char__name">{name}</div>
                            </li>
                        );
                    })
                }
            </ul>
            <button className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
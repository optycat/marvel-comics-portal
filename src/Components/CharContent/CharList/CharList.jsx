import { Component } from 'react';
import { PropTypes } from 'prop-types';

import MarvelServise from '../../../servises/MarvelServise';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';
import Spinner from '../../Spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        active: null,
        offset: 210,
        newItemsLoading: false,
        charEnded: false,
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onNewItemsLoading();
        this.marvelServise
            .getChars(offset)
            .then((res) => this.onCharsLoaded(res, offset))
            .catch(this.onErrorOcupeted);
    } 

    onCharsLoaded = (additionalChars, offsetProp) => {
        let ended = additionalChars.length < 9 ? true : false;

        this.setState(({chars, offset}) => ({
            chars: offsetProp ? [...chars, ...additionalChars] : additionalChars,//[...chars, ...additionalChars],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onNewItemsLoading = () => {
        this.setState({ newItemsLoading: true });
    }

    onErrorOcupeted = () => {
        this.setState({ error: true, loading: false });
    }

    isActive = (id) => {
        this.setState({ active: id });
    }

    render() {
        const { error, loading, offset, active, chars, newItemsLoading, charEnded } = this.state;
        if (error) return <ErrorMassage />
        if (loading) return <Spinner />
        return (
            <div className="char__list">
                <ul className="char__grid">
                    <CharItem chars={chars}
                        onCharSelected={this.props.onCharSelected}
                        active={active}
                        isActive={this.isActive} />
                </ul>
                <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block' }}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

const CharItem = ({ chars, onCharSelected, active, isActive }) => {

    return chars.map((char) => {
        const { name, thumbnail, id } = char;
        const handleClick = () => {
            isActive(id);
            onCharSelected(id);
        }

        return (
            <li className={active === id ? "char__item char__item_selected" : "char__item"}
                key={id}
                onClick={handleClick}>
                <img src={thumbnail} alt={name} />
                <div className="char__name">{name}</div>
            </li>
        );
    });
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
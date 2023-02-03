import { Component } from 'react';
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
        times: 1,
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateGrid();
    }

    updateGrid = () => {
        this.marvelServise
            .getAllChars()
            .then(this.onCharsLoaded)
            .catch(this.onErrorOcupeted);
    }

    onCharsLoaded = (chars) => {
        this.setState({ chars, loading: false, error: false });
    }

    onErrorOcupeted = () => {
        this.setState({ error: true, loading: false });
    }

    isActive = (id) => {
        this.setState({ active: id });
    }

    onLoadMore = () => {
        this.marvelServise
            .getMoreChars(this.state.times)
            .then(this.onAdditionalCharsLoaded)
            .catch(this.onErrorOcupeted);
    }

    onAdditionalCharsLoaded = (additionalChars) => {
        this.setState({ chars: [...this.state.chars, ...additionalChars], 
                        loading: false, 
                        error: false, 
                        times: this.state.times + 1})
    }

    render() {
        if (this.state.error) return <ErrorMassage />
        if (this.state.loading) return <Spinner />
        return (
            <div className="char__list">
                <ul className="char__grid">
                    <CharItem chars={this.state.chars} 
                        onCharSelected={this.props.onCharSelected}
                        active={this.state.active}
                        isActive={this.isActive} />
                </ul>
                <button className="button button__main button__long"
                    onClick={this.onLoadMore}>
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

export default CharList;
import { Component } from 'react';
import MarvelServise from '../../../Servises/MarvelServise';
import ErrorMassage from '../../ErrorMassage/ErrorMassage';
import Spinner from '../../Spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        chars: [],
        loading: true,
        error: false,
        active: null
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

    onCharImgNone = (char) => {
        let imgStatus = char.thumbnail.split('/');
        return imgStatus[imgStatus.length - 1] === 'image_not_available.jpg';
    }

    isActive = (id) => {
        this.setState({ active: id });
    }

    render() {
        if (this.state.error === true) return <ErrorMassage />
        if (this.state.loading === true) return <Spinner />
        return (
            <div className="char__list">
                <ul className="char__grid">
                    <CharItem chars={this.state.chars} onCharSelected={this.props.onCharSelected} active={this.state.active} isActive={this.isActive} />
                </ul>
                <button className="button button__main button__long">
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
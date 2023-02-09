import { useState, useEffect, useRef } from 'react';
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

    // state = {
    //     chars: [],
    //     loading: true,
    //     error: false,
    //     active: null,
    //     offset: 210,
    //     newItemsLoading: false,
    //     charEnded: false,
    // }

    const marvelServise = new MarvelServise();

    useEffect(() => onRequest(), []);
    // componentDidMount() {
    //     this.onRequest();
    //     console.log(this)
    // }

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
        // this.setState(({ chars, offset }) => ({
        //     chars: [...chars, ...additionalChars],
        //     loading: false,
        //     newItemsLoading: false,
        //     offset: offset + 9,
        //     charEnded: ended
        // }));
    }

    const onNewItemsLoading = () => setNewItemsLoading(true);
    // onNewItemsLoading = () => {
    //     this.setState({ newItemsLoading: true });
    // }

    const onErrorOcupeted = () => {
        setError(true);
        setLoading(false);
        // this.setState({ error: true, loading: false });
    }

    // this.setState({ active: id });
    // const itemRefs = useRef([]);

    const isActive = (id, i) => {
        setActive(active => id);
        // itemRefs.current[i].focus();//.current[id]);//.focus();
    }
    // render() {
    // const { error, loading, offset, active, chars, newItemsLoading, charEnded } = this.state;
    if (error) return <ErrorMassage />
    if (loading) return <Spinner />
    return (
        <div className="char__list">
            <ul className="char__grid">
                {
                    chars.map((char, i) => {
                        const { name, thumbnail, id } = char;
                        const handleClick = () => {
                            isActive(id);
                            props.onCharSelected(id);
                        }

                        return (
                            <li className={active === id ? "char__item char__item_selected" : "char__item"}
                                key={id}
                                // ref={el => itemRefs.current[i] = el}
                                onClick={handleClick}>
                                <img src={thumbnail} alt={name} />
                                <div className="char__name">{name}</div>
                            </li>
                        );
                    })
                }
                {/* <CharItem chars={chars}
                        onCharSelected={this.props.onCharSelected}
                        active={active}
                        isActive={this.isActive} /> */}
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
// }

// const CharItem = ({ chars, onCharSelected, active, isActive }) => {

//     return chars.map((char) => {
//         const { name, thumbnail, id } = char;
//         const handleClick = () => {
//             isActive(id);
//             onCharSelected(id);
//         }

//         return (
//             <li className={active === id ? "char__item char__item_selected" : "char__item"}
//                 key={id}
//                 onClick={handleClick}>
//                 <img src={thumbnail} alt={name} />
//                 <div className="char__name">{name}</div>
//             </li>
//         );
//     });
// }

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
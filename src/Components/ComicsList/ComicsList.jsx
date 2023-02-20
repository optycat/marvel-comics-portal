import { useState, useEffect } from "react";

import ErrorMassage from "../ErrorMassage/ErrorMassage";
import Spinner from "../Spinner/Spinner";
import useMarvelServise from "../../servises/MarvelServise";

import './comicsList.scss';
import avengers from '../../image/Avengers.png';
import avengersLogo from '../../image/Avengers_logo.png';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(10);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { error, loading, clearError, getComics } = useMarvelServise();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getComics(offset).then((res) => onComicsLoaded(res));
    }

    const onComicsLoaded = (additionalComics) => {
        clearError();
        let ended = additionalComics.length < 8 ? true : false;
        setComics(comics => [...comics, ...additionalComics]);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    const errorMassage = error ? <ErrorMassage /> : null;
    const spinner = loading && !newItemsLoading ? <Spinner /> : null;
    const content = !(loading || error) ?
        <ul className="comicscontainer__grid">
            {
                comics.map((comic, i) => {
                    const { id, thumbnail, title, price } = comic;
                    return (
                        <li className="comicscontainer__item" key={id}>
                            <img src={thumbnail} alt={title} className="comicscontainer__image" />
                            <div className="comicscontainer__title">{title}</div>
                            <div className="comicscontainer__price">{price}</div>
                        </li>
                    );
                })
            }
        </ul> : null;
    return (
        <div className="comicscontainer">
            <div className="comicslist">
                <img src={avengers} alt="Avengers" className="" />
                <h3 className="comicslist__title">New comics every week! <br />Stay tuned!</h3>
                <img src={avengersLogo} alt="Avengers" className="comicslist__decoration" />
            </div>
            {errorMassage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default ComicsList;
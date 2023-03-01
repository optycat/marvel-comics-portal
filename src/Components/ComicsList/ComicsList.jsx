import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ErrorMassage from "../ErrorMassage/ErrorMassage";
import Spinner from "../Spinner/Spinner";
import useMarvelServise from "../../servises/MarvelServise";

import ComicsListStatic from "./ComicsListStatic/ComicsListStatic";

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(10);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { error, loading, getComics } = useMarvelServise();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getComics(offset).then((res) => onComicsLoaded(res, offset));
    }

    const onComicsLoaded = (additionalComics) => {
        let ended = additionalComics.length < 8 ? true : false;
        setComics(comics => [...comics, ...additionalComics]);
        setNewItemsLoading(newItemsLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    if (error) return (
        <div className="comicscontainer">
            <ComicsListStatic />
            <ErrorMassage />
        </div>
    );

    if (loading && !newItemsLoading) return (
        <div className="comicscontainer">
            <ComicsListStatic />
            <Spinner />
        </div>
    );

    return (
        <div className="comicscontainer">
            <ComicsListStatic />

                <ul className="comicscontainer__grid">
                    {
                        comics.map((comic, i) => {
                            const { id, thumbnail, title, price } = comic;
                            return (
                                <li className="comicscontainer__item" key={i}>
                                    <Link to={`${id}`}>
                                        <img src={thumbnail} alt={title} className="comicscontainer__image" />
                                        <p className="comicscontainer__title">{title}</p>
                                        <p className="comicscontainer__price">{price}</p>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
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
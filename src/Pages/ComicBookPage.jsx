import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useMarvelServise from '../servises/MarvelServise';

import Spinner from '../Components/Spinner/Spinner';
import ErrorMassage from '../Components/ErrorMassage/ErrorMassage';

import './comicBookPage.scss';

const ComicBookPage = () => {
    const { comicId } = useParams();
    const { getComicBook, loading, error, clearError } = useMarvelServise();

    const [comic, setComic] = useState({});

    useEffect(() => {
        onRequest(comicId);
    }, [comicId]);

    const onRequest = (comicUnique) => {
        clearError();
        getComicBook(comicUnique).then((res) => setComic(res));
    }

    const { title, thumbnail, price, description, language, pages } = comic;

    if (loading) return <Spinner />
    if (error) return <ErrorMassage />

    return (
        <div className="comic-book">
            <img src={thumbnail} alt={title} className="comic-book__img" />
            <div className="comic-book__info">
                <h2 className="comic-book__name">{title}</h2>
                <p className="comic-book__descr">{description}</p>
                <p className="comic-book__descr">{pages} pages</p>
                <p className="comic-book__descr">Language: {language}</p>
                <div className="comic-book__price">{price}</div>
            </div>
            <Link to="/comics" className="comic-book__back">Back to all</Link>
        </div>
    )
}

export default ComicBookPage;
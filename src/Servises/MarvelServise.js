import { createRef } from "react";
import { useHttp } from "../Hooks/http.hook";

const useMarvelServise = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=7f34be55b5354ddee9579868f375a6bf';
    const _apiOfset = 210;

    const getChar = async (id) => {
        const answer = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _intiateCharacter(answer.data.results[0]);
    }
    const getChars = async (offset = _apiOfset) => {
        const answer = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return answer.data.results.map(_intiateCharacter);
    }
    const getComicBook = async (id) => {
        const answer = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _intiateComics(answer.data.results[0]);
    }
    const getComics = async (offset = _apiOfset) => {
        const answer = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return answer.data.results.map(_intiateComics);
    }

    const _intiateCharacter = (char) => {
        const imgStatus = char.thumbnail.path.split('/');
        return ({
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
            imgNone: imgStatus[imgStatus.length - 1] === 'image_not_available' ? true : false,
            nodeRef: createRef(null),
        });
    }
    const _intiateComics = (comics) => {
        return ({
            title: comics.title,
            price: comics.prices[0].price === 0 ? 'NOT AVAILABLE' : `${comics.prices[0].price} $`,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            id: comics.id,
            description: comics.description ? comics.description : 'Some tipical description.',
            pages: comics.pageCount === 0 || !comics.pageCount ? 'Unknown amount of' : comics.pageCount,
            language: !comics.textObjects.language ? 'Unknown' : comics.textObjects.language,
        });
    }

    return { loading, error, clearError, getChar, getChars, getComicBook, getComics };
}

export default useMarvelServise;
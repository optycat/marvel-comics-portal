

class MarvelServise {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    _apiKey = 'apikey=7f34be55b5354ddee9579868f375a6bf';

    getResourse = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    getAllChars = async () => {
        const answer = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return answer.data.results.map(this._intiateCharacter);
    }
    getChar = async (id) => {
        const answer = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._intiateCharacter(answer.data.results[0]);
    }
    getCharImageStatus = async (id) => {
        const answer = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return answer;
    }

    _intiateCharacter = (char) => {
        return ({
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id
        });
    }
    // _intiateCharacters = (char) => {
    //     return ({
    //         name: char.name,
    //         description: char.description,
    //         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
    //         homepage: char.urls[0].url,
    //         wiki: char.urls[1].url,
    //         id: char.id
    //     });
    // }
}

export default MarvelServise;
import { Component } from 'react';

import CharList from './CharList/CharList';
import CharInfo from './CharInfo/CharInfo';

import './charContent.scss';

class CharContent extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({ selectedChar: id });
    }

    render() {
        return (
            <div className="char__content">
                <CharList onCharSelected={this.onCharSelected}/>
                <CharInfo />
            </div>
        );
    }
}

export default CharContent;
import { Component } from 'react';

import CharList from './CharList/CharList';
import CharInfo from './CharInfo/CharInfo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

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
                <ErrorBoundary>
                    <CharList onCharSelected={this.onCharSelected} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={this.state.selectedChar} />
                </ErrorBoundary>
            </div>
        );
    }
}

export default CharContent;
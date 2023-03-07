import { useState, useCallback } from 'react';

import CharList from './CharList/CharList';
import CharInfo from './CharInfo/CharInfo';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import './charContent.scss';

const CharContent = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = useCallback((id) => setChar(id), []);


    return (
        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
                <CharInfo charId={selectedChar} />
            </ErrorBoundary>
        </div>
    );
}

export default CharContent;
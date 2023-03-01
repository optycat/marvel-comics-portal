import RandomChar from "../RandomChar/RandomChar";
import CharContent from "../CharContent/CharContent";
import BGDecoration from "../BGDecoration/BGDecoration";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const MainPage = () => {
    return (
        <>
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <CharContent />
            </main>
            <BGDecoration />
        </>
    );
}
export default MainPage;
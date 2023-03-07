import RandomChar from "../Components/RandomChar/RandomChar";
import CharContent from "../Components/CharContent/CharContent";
import BGDecoration from "../Components/BGDecoration/BGDecoration";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";

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
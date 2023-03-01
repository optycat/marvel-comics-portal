import ErrorMassage from "../ErrorMassage/ErrorMassage"
import { Link } from "react-router-dom"

import BGDecoration from "../BGDecoration/BGDecoration"

const Page404 = () => {
    return (
        <div style={{'display': 'flex', 'justify-content': 'center', 'flex-direction': 'column', 'align-items': 'center'}}>
            <ErrorMassage />
            <p style={{'padding': '40px 0 20px 0'}}>Required page is not exist!</p>
            <Link to="/"
                style={{'text-decoration': 'underline'}}>Come back to main page</Link>
            <BGDecoration />
        </div>
    )
}

export default Page404;
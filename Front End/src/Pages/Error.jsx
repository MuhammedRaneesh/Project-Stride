import "./Error.css"
import { NavLink } from "react-router-dom"
function Error() {
    return (
        <div className="page">
            <div className="container">
                <div className="code">404</div>
                <h1 className="title">Oops! Page Not Found</h1>
                <p className="message">
                    The page you're looking for seems to have taken a different.
                    Don't worry, let's get you back on track!
                </p>

                <div className="buttons">
                    <NavLink to="/" className="btn primary">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 2L2 7H4V13H7V9H9V13H12V7H14L8 2Z" fill="currentColor" />
                        </svg>
                        GO TO HOME
                    </NavLink>
                    <NavLink to="/shop" className="btn secondary">
                        CONTINUE SHOPPING
                    </NavLink>

                    
                </div>
            </div>
        </div>
    )
}

export default Error
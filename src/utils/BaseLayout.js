
import NavBar from '../components/NavBar';

import './baseLayout.css';


const BaseLayout = ({children}) => {


    return (
        <div className="container">
            <nav className="sidebarNav">
                <NavBar />
            </nav>

            <div className="pageContent">
                {children}
            </div>
        </div>
    );
}

export default BaseLayout;
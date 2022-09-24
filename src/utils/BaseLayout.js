
import NavBar from '../components/NavBar';

import './baseLayout.css';


const BaseLayout = ({children, active}) => {


    return (
        <div className="container-my">
            <nav className="sidebarNav">
                <NavBar active={active} />
            </nav>

            <div className="pageContent">
                {children}
            </div>
        </div>
    );
}

export default BaseLayout;
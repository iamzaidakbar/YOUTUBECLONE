import './SideMenu.scss'
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faCheckDouble,
	faHouse,
	faPlayCircle,
	faRecycle,
	faStopwatch,
	faVideo
} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ytContext from "../../context/ytContext";

export default function SideMenu() {
	let location = useLocation();

	const context = useContext(ytContext);
	const {darkMode, menuState} = context

	return <div className={"SideMenu " + (darkMode && "dark ") + (menuState && " active ")}>
			<ul className="sideMenu-links">
				<li className={location.pathname === '/' ? 'icon-active' : "" } ><Link to={'/'}><FontAwesomeIcon className="sideMenu-icons" size={'lg'} icon={faHouse}/><span className="link-text">Home</span></Link></li>
				<li className={location.pathname === '/shorts' ? 'icon-active' : "" } ><Link to={'/shorts'}><FontAwesomeIcon className="sideMenu-icons" size={'lg'} icon={faVideo}/><span className="link-text">Shorts</span></Link></li>
				{menuState &&
					<>
						<span className="line"></span>
						<li className={location.pathname === '/history' ? 'icon-active' : "" } ><Link to={'/history'}><FontAwesomeIcon className="sideMenu-icons" size={'lg'} icon={faRecycle}/><span className="link-text">History</span></Link></li>
						<li className={location.pathname === '/yourvideos' ? 'icon-active' : "" } ><Link to={'/yourvideos'}><FontAwesomeIcon className="sideMenu-icons" size={'lg'} icon={faPlayCircle}/> <span className="link-text">Your videos</span></Link></li>
						<li className={location.pathname === '/watchlater' ? 'icon-active' : "" } ><Link to={'/watchlater'}><FontAwesomeIcon className="sideMenu-icons" size={'lg'} icon={faStopwatch}/> <span className="link-text">Watch later</span></Link></li>
						<li className={location.pathname === '/likedvideos' ? 'icon-active' : "" } ><Link to={'/likedvideos'}><FontAwesomeIcon className="sideMenu-icons" size={'lg'} icon={faCheckDouble}/> <span className="link-text">Liked videos</span></Link></li>
						<span className="line"></span>
					</>
				}
			</ul>
		</div>
}
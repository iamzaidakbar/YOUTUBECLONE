import './SideMenu.scss'
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faRecycle, faVideo} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ytContext from "../../context/ytContext";
import {useSelector} from "react-redux";
import Subscriptions from "../Subscriptions/Subscriptions";

export default function SideMenu() {
	let location = useLocation();

	const subscriptions = useSelector(state => state.addToSubscriptions)

	const context = useContext(ytContext);
	const {darkMode, menuState} = context

	return <div className={"SideMenu " + (darkMode && "dark ") + (menuState && " active ")}>
		<ul className="sideMenu-links">
			<li className={location.pathname === '/' ? 'icon-active' : ""}><Link to={'/'}><FontAwesomeIcon
				className="sideMenu-icons" size={'lg'} icon={faHouse}/><span className="link-text">Home</span></Link>
			</li>
			<li className={location.pathname === '/shorts' ? 'icon-active' : ""}><Link to={'/shorts'}><FontAwesomeIcon
				className="sideMenu-icons" size={'lg'} icon={faVideo}/><span className="link-text">Shorts</span></Link>
			</li>
			{menuState &&
				<>
					<span className="line"></span>
					<li className={location.pathname === '/history' ? 'icon-active' : ""}><Link
						to={'/history'}><FontAwesomeIcon className="sideMenu-icons" size={'lg'} icon={faRecycle}/><span
						className="link-text">History</span></Link></li>
					<li className='subscriptions-heading'>Subscriptions</li>
					<span className="line"></span>
				</>
			}
		</ul>
		{subscriptions &&
			subscriptions.map(data => {
				return <Subscriptions
					key={data?.snippet?.channelId}
					channelId={data?.snippet?.channelId}
					img_url={data?.snippet?.thumbnails?.high?.url}
					channelName={data?.snippet?.channelTitle}/>
			})
		}
	</div>
}
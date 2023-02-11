import './Subscriptions.scss'
import {Link} from "react-router-dom";
import {useContext} from "react";
import ytContext from "../../context/ytContext";

export default function Subscriptions(props) {

	const context = useContext(ytContext);
	const {darkMode, menuState} = context

	console.log(props)

	return <div className={"Subscriptions " + (darkMode && "dark ") + (menuState && " active ")}>
		{props && <Link className='link' to={'/channel/' + props.channelId}>
			<li className="subscriber">
				<img src={props.img_url} width={30} height={30} alt=""/>
				<p>{props.channelName}</p>
			</li>
		</Link>}
	</div>
}
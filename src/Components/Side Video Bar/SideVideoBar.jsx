import './SideVideoBar.scss'
import {useContext} from "react";
import ytContext from "../../context/ytContext";
import {Link} from "react-router-dom";

export default function SideVideoBar(props) {
	const context = useContext(ytContext);
	const {darkMode, setVideoID,setMenuState, fetchVideoById} = context


	function passDate() {
		setMenuState(false)
		setVideoID(props.data?.id?.videoId)
		fetchVideoById(props?.data?.id?.videoId)
	}

	return <div className={"shortVideoCard " + (darkMode && "dark ")}>
		<div className="thumbnail-wrapper">
			<Link onClick={passDate} to={'/watch/' + props.data?.id?.videoId}>
				<img className="VideoCard-img" src={props.thumbnail} width={155} height={80} alt=""/>
			</Link>
		</div>
		<div className="VideoCard-details">
				<p className="VideoCard-description">{props.description.toString().slice(0,60)} ...</p>
				<p className="VideoCard-channel-name">{props.channel_name}</p>
		</div>
	</div>
}
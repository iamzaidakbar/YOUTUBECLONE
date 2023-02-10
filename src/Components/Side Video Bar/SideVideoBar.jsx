import './SideVideoBar.scss'
import {useContext} from "react";
import ytContext from "../../context/ytContext";
import {Link} from "react-router-dom";

export default function SideVideoBar(props) {
	const context = useContext(ytContext);
	const {darkMode, fetchChannel} = context



	return <div className={"shortVideoCard " + (darkMode && "dark ")}>
		<div className="thumbnail-wrapper">
			<Link to={'/watch/' + props.data?.id?.videoId}>
				<img className="VideoCard-img" src={props.thumbnail} alt=""/>
			</Link>
		</div>
		<div className="VideoCard-details">
			<p className="VideoCard-description">{props.description.toString().slice(0, 60)} ...</p>
			<Link onClick={() => {
				fetchChannel(props.channelId)
			}} className="link" to={'/channel'}><p className="VideoCard-channel-name">{props.channel_name}</p></Link>
		</div>
	</div>
}
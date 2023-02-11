import './SideVideoBar.scss'
import {useContext} from "react";
import ytContext from "../../context/ytContext";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ADD} from "../../actions";

export default function SideVideoBar(props) {
	const dispatch = useDispatch()

	const context = useContext(ytContext);
	const {darkMode, fetchChannel} = context

	return <div className={"shortVideoCard " + (darkMode && "dark ")}>
		<div onClick={() => {
			dispatch(ADD(props.data))
		}} className="thumbnail-wrapper">
			<Link to={'/watch/' + props.data?.id?.videoId} state={{data: props.data}}>
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
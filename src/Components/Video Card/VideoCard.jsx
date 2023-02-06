import './VideoCard.scss'
import {useContext} from "react";
import ytContext from "../../context/ytContext";
import {Link} from "react-router-dom";

export default function VideoCard(props) {
	const context = useContext(ytContext);
	const {darkMode,
		menuState,
		randomNum,
		setVideoID,
		setMenuState,
		fetchVideoById,
		convertDate,
		fetchUserComments,
		setVideoId
	} = context

	const dateString = props.publishedAt
	const date = new Date(dateString)
    let dateNew = `${date.getFullYear()}-${date.getMonth() === 0 ? date.getMonth() + 1 : date.getMonth()}-${date.getDay() === 0 ? date.getDay() + 1 : date.getDay()}`
	console.log(dateNew)
	function passDate() {
		setMenuState(false)
		setVideoID(props.data?.id?.videoId)
		setVideoId(props?.data?.id?.videoId)
		fetchVideoById(props?.data?.id?.videoId)
		fetchUserComments(props?.data?.id?.videoId)
	}

	return <div className={"VideoCard " + (darkMode && "dark ") + (menuState && " active")}>
		<div className="thumbnail-wrapper">
			<Link onClick={passDate} to={'/watch/' + props.data?.id?.videoId}>
				<img className={"VideoCard-img " + (props.channel === "youtube#channel" && "channel")} src={props.thumbnail} width={menuState ? 275 : 320} height={menuState ? 160 : 190} alt=""/>
				<p className="thumbnail-text">Click to play</p>
			</Link>
		</div>
		<div className="VideoCard-details">
			<div className="channel-logo">
				<img style={{borderRadius: "50%"}} src={props.logo} height={40} width={40} alt=""/>
			</div>
			<div className="channel-info">
				<p className="VideoCard-description">{props.description.toString().slice(0,48)} ...</p>
				<p className="VideoCard-channel-name">{props.channel_name}</p>
				<div className="video-views">
					<p>{randomNum(1,3)}K views</p>
					<p>•</p>
					<p>{convertDate(dateNew)}</p>
				</div>
			</div>
		</div>
	</div>
}
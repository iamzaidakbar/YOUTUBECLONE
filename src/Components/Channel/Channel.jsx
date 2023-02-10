import './Channel.scss'
import {useContext, useEffect, useState} from "react";
import ytContext from "../../context/ytContext";
import {useParams} from "react-router-dom";

export default function Channel() {
	let {id} = useParams();

	const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=AIzaSyBv7Ox-8bFX1sDtqfprHOmfOhvqJMuvicE`

	const [channel, setChannel] = useState([])
	const context = useContext(ytContext);
	const {darkMode, menuState, convertDate, randomNum} = context;

	useEffect(() => {
		return () => {
			fetch(channelUrl)
				.then(response => response.json())
				.then(data => {
					setChannel(data.items[0])
				})
				.catch(error => console.log(error.message));
		}
		// eslint-disable-next-line
	}, []);

	const dateString = channel?.snippet?.publishedAt
	const date = new Date(dateString)
	let dateNew = `${date.getFullYear()}-${date.getMonth() === 0 ? date.getMonth() + 1 : date.getMonth()}-${date.getDay() === 0 ? date.getDay() + 1 : date.getDay()}`

	return <div className={"Channel " + (darkMode && " dark ") + (menuState && " active")}>
		<div className="channel-thumbnail">
			{channel?.snippet?.thumbnails?.high?.url && <img width={"100%"}
			                                                 src={channel?.snippet?.thumbnails?.high?.url}
			                                                 alt=""/>}
		</div>
		<div className="channel-actions">
			<div className="logoAndInfo">
				{channel?.snippet?.thumbnails?.high?.url && <img style={{borderRadius: "50%"}} width={90} height={90}
				                                                 src={channel?.snippet?.thumbnails?.high?.url}
				                                                 alt=""/>}
				<div className="subs">
					<p>{channel?.snippet?.title}</p>
					<p>@{channel?.snippet?.customUrl}</p>
					<p>{randomNum(1, 10)} subscribers</p>
				</div>
			</div>
			<div className="sub-btn">
				<button>Subscribe</button>
			</div>
		</div>

		<div className="about">
			<div className="description">
				<p>Description</p>
				<p>{channel?.snippet?.localized ? channel?.snippet.localized?.description : channel?.snippet?.description}</p>
			</div>
			<div className="stats">
				<p>Stats</p>
				<p>Joined {convertDate(dateNew)}</p>
				<p>{randomNum(1, 100)} views</p>
			</div>
		</div>
	</div>
}
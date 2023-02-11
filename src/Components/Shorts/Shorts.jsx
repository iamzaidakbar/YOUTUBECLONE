import './Shorts.scss'
import {useContext} from "react";
import ytContext from "../../context/ytContext";
import Reel from "../Reel/Reel";

export default function Shorts() {

	const context = useContext(ytContext);
	const {darkMode, reels, reload} = context

	return <div className={"Shorts " + (darkMode && "dark")}>
		{reels && reels.map(data => {
			if (data?.id?.videoId) {
				return <Reel
					key={data?.id?.videoId}
					videoID={data?.id?.videoId}
					username={data?.snippet?.channelTitle}
					src={data?.snippet?.thumbnails?.default?.url}
				/>
			}
		})}
	</div>
}
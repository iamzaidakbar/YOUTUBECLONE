import './Home.scss'
import {useContext, useEffect} from "react";
import ytContext from "../../context/ytContext";
import VideoCard from "../Video Card/VideoCard";

export default function Home() {

	// Context Api
	const context = useContext(ytContext);
	const {
		fetchVideos,
		shortLinks,
		menuState,
		darkMode,
		ytVideos,
	} = context

	// Fetches the video and reels before loading the page
	useEffect(() => {
		return () => {
			fetchVideos('trailers')
		};
		// eslint-disable-next-line
	}, []);


	// Generated the random id
	function generateId() {
		return Math.random().toString(36).substr(2, 9);
	}


	return <div className={"Home " + (darkMode && "dark ") + (menuState && " active")}>
		<div className="upper-section">
			{shortLinks.map(data => {
				return <button key={generateId()} onClick={() => {
					fetchVideos(data)
				}} className="shortLinks-btn">{data}</button>
			})}
		</div>
		<div className="lower-section">
			{ytVideos && ytVideos.map(data => {
				return <VideoCard
					data={data}
					key={data?.id?.videoId}
					channel={data?.id?.kind}
					description={data?.snippet?.title.slice(0.40)}
					channel_name={data?.snippet?.channelTitle}
					thumbnail={data?.snippet?.thumbnails?.high?.url}
					logo={data?.snippet?.thumbnails?.medium?.url}
					publishedAt={data?.snippet?.publishedAt}
				/>
			})}
		</div>
	</div>
}
import './History.scss'
import {useSelector} from "react-redux";
import SideVideoBar from "../Side Video Bar/SideVideoBar";
import {useContext} from "react";
import ytContext from "../../context/ytContext";

export default function History() {
	const watchHistory = useSelector(state => state.addToWatchHistory)

	// Context Api
	const context = useContext(ytContext);
	const {
		menuState,
		darkMode,
	} = context

	return <div className={"History " + (darkMode && "dark ") + (menuState && " active")}>
		<p className="Title">Watch History</p>
		<div className="watchHistory-container">
			{watchHistory &&
				watchHistory.map(data => {
					return <SideVideoBar
						data={data}
						key={data?.id?.videoId}
						description={data?.snippet?.title}
						channel_name={data?.snippet?.channelTitle}
						thumbnail={data?.snippet?.thumbnails?.high?.url}
						logo={data?.snippet?.thumbnails?.medium?.url}
						publishedAt={data?.snippet?.publishedAt}
					/>
				})
			}

			{watchHistory.length < 1 &&
				<button>Clear watch history</button>
			}

		</div>
	</div>
}
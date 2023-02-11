import './WatchVideo.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useContext, useEffect, useState} from "react";
import ytContext from "../../context/ytContext";
import SideVideoBar from "../Side Video Bar/SideVideoBar";
import Comments from "../Comments/Comments";
import ReactPlayer from "react-player";
import default_img from '../../images/default-img.png'
import {useLocation, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ADD_SUBSCRIPTION} from "../../actions/subs";

export default function WatchVideo() {
	const location = useLocation()
	let {id} = useParams();
	const {data} = location.state

	const context = useContext(ytContext);
	const {
		fetchUserVideoAndComments,
		setIsSubscribed,
		isSubscribed,
		setMenuState,
		fetchVideos,
		convertDate,
		menuState,
		randomNum,
		userVideo,
		darkMode,
		ytVideos,
		comments,
	} = context

	useEffect(() => {
		return () => {
			setMenuState(false)
			fetchUserVideoAndComments(id)
			fetchVideos('music')
		}
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		return () => {
			setIsSubscribed(true)
		};
	}, [id]);


	const dispatch = useDispatch()

	const [showMore, setShowMore] = useState(false);

	const dateString = userVideo?.snippet?.publishedAt
	const date = new Date(dateString)
	let dateNew = `${date.getFullYear()}-${date.getMonth() === 0 ? date.getMonth() + 1 : date.getMonth()}-${date.getDay() === 0 ? date.getDay() + 1 : date.getDay()}`


	return <div className={"WatchVideo " + (darkMode && "dark ") + (menuState && " active ")}>
		<div className="left-wrapper">
			<div className="video-player">
				<ReactPlayer
					url={`https://www.youtube.com/watch?v=` + id}
					key={id}
					width={900}
					height={500}
					controls={true}
					playing={true}
					config={{
						youtube: {
							playerVars: {showInfo: 1},
						}
					}}
				/>
			</div>
			<div className="video-title">
				<p>{userVideo?.id && userVideo?.snippet?.localized?.title}</p>
			</div>
			<div className="subscribersAndLikes">
				<div>
					<img style={{borderRadius: "50%"}}
					     src={userVideo?.id && userVideo?.snippet?.thumbnails?.default?.url} width={50} height={50}
					     alt=""/>
				</div>
				<div className="video-channel-name">
					<span><p className="name">{userVideo?.id && userVideo?.snippet[0]?.channelTitle}</p></span>
					<span><p className="subs">{randomNum(1, 10)} Subscribers</p></span>
				</div>
				<div className="subscribe-btn">
					<button onClick={() => {
						if (isSubscribed) dispatch(ADD_SUBSCRIPTION(data))
						setIsSubscribed(false)
					}}>{isSubscribed ? 'Subscribe' : 'Subscribed'}
					</button>
				</div>
				<div className="like-unlike-btn">
					<button><FontAwesomeIcon style={{marginRight: "5px"}} size={'xl'}
					                         icon={faThumbsUp}/>{userVideo?.id && userVideo?.statistics?.likeCount.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",")}
					</button>
					<button><FontAwesomeIcon style={{marginRight: "5px"}} size={'xl'} icon={faThumbsDown}/></button>
				</div>
			</div>

			<div className="video-description-wrapper">
				<div className="viewsAndDate">
					<p className="views">{userVideo?.id && userVideo?.statistics?.viewCount.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",")} views</p>
					<p className="date">{convertDate(dateNew)}</p>
				</div>
				<div className="video-description">
					<p className={"desc " + (showMore && "showMore")}>{userVideo?.id && userVideo?.snippet?.localized?.description}</p>
					<p onClick={() => {
						setShowMore(!showMore)
					}} className="showHideBtn">{showMore ? "Show less" : "Show more"}</p>
				</div>
			</div>
			<div className="comments">
				<p>{userVideo?.id && userVideo?.statistics?.commentCount.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(",")} Comments</p>
			</div>

			<div className="Comments-wrapper">
				{comments && comments.map(data => {
					return <Comments
						key={data?.id}
						default_img={default_img}
						publishedAt={data?.snippet?.topLevelComment?.snippet?.publishedAt}
						authorProfileImageUrl={data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
						authorDisplayName={data?.snippet?.topLevelComment?.snippet?.authorDisplayName}
						textDisplay={data?.snippet?.topLevelComment?.snippet?.textOriginal}
						likeCount={data?.snippet?.topLevelComment?.snippet?.likeCount}
					/>
				})}
			</div>

		</div>
		<div className="right-wrapper">
			{ytVideos && ytVideos.map(data => {
				return <SideVideoBar
					key={data?.id?.videoId}
					data={data}
					channelId={ytVideos?.snippet?.channelId}
					description={data?.snippet?.title}
					channel_name={data?.snippet?.channelTitle}
					thumbnail={data?.snippet?.thumbnails?.high?.url}
					logo={data?.snippet?.thumbnails?.medium?.url}
					publishedAt={data?.snippet?.publishedAt}
				/>
			})}
		</div>

	</div>
}
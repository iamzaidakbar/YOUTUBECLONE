import './Reel.scss'
import ReactPlayer from "react-player";

export default function Reel(props) {

	return (<div className='Reel'>
			<div className="ReelVideo">
				<div className="Video-Player">
					<ReactPlayer
						key={`https://www.youtube.com/watch?v=` + props.videoID}
						url={`https://www.youtube.com/watch?v=` + props.videoID}
						width={340}
						height={600}
						controls={false}
						playing={false}
						config={{
							youtube: {
								playerVars: {showInfo: 0},
							}
						}}
					/>
				</div>
				<div className="username">
					<img style={{borderRadius: "50%"}} src={props.src} width={40}
					     height={40} alt=""/>
					<p>@{props.username}</p>
				</div>
			</div>
			<div className="ReelDetails">
				<div className="reelChannelAvatar">
					<img style={{borderRadius: "50%"}} src={props.src} width={50}
					     height={50} alt=""/>
				</div>
			</div>
		</div>)

}
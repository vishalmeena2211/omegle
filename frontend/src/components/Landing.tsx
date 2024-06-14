import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        // MediaStream
        const audioTrack = stream.getAudioTracks()[0]
        const videoTrack = stream.getVideoTracks()[0]
        setLocalAudioTrack(audioTrack);
        setlocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack])
        videoRef.current.play();
        // MediaStream
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam()
        }
    }, [videoRef]);

    if (!joined) {

        return <div className="w-full flex justify-center items-center flex-col min-h-screen gap-12">
            <h1 className="text-center text-3xl">Welcome to Omegle Like Clone
                <br />
                <p className="text-lg my-3">This is a Prectice Project and i am working on it to add more advance features</p>
            </h1>

            <video className="w-full h-[250px] md:h-[400px]" autoPlay ref={videoRef}></video>
            <div className="flex gap-4 items-center">
                <input placeholder="Enter Your Name" className="border border-black px-2 py-2 rounded-lg" type="text" onChange={(e) => {
                    setName(e.target.value);
                }}>
                </input>
                <button className="text-2xl font-semibold" onClick={() => {
                    setJoined(true);
                }}>Join</button>
            </div>
        </div>
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}
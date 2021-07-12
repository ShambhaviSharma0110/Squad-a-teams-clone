import { useEffect, useReducer, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/apiRequests";
import {
  BASE_URL,
  GET_CALL_ID,
  SAVE_CALL_ID,
} from "../../utils/apiEndpoints";
import io from "socket.io-client";
import Chat from "../Misc/Chat/Chat";
import ChatListReducer from "../../reducers/ChatListReducer";
import Alert from "../Misc/Alert/Alert";
import MeetingInfo from "../Misc/MeetInfo/MeetingInfo";
import CallingFoot from "../Misc/CallingFoot/CallingFoot";
import CallingHead from "../Misc/CallingHead/CallingHead";
import Peer from "simple-peer";
import "./Calling.scss";

let peer = null;
const socket = io.connect("http://localhost:4000"); //connecting w the backend to host this on the port no. 4000
const initialState = [];

const Calling = () => {
  const history = useHistory();
  let { id } = useParams();
  const isAdmin = window.location.hash == "#init" ? true : false; //admin link has #init
  const url = `${window.location.origin}${window.location.pathname}`;
  let Timeout = null;

  const [chatList, chatListReducer] = useReducer(
    ChatListReducer,
    initialState
  );

  const [streamObject, setStreamObject] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfo, setMeetInfo] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [chatAlert, setChatAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  const [isVid, setIsVid] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      setMeetInfo(true);
    }
    initWebRTC();
    socket.on("code", (data) => {
      if (data.url === url) {
        peer.signal(data.code);
      }
    });
  }, []);

  //function for the link to join at
  const getJoiningCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    if (response.code) {
      peer.signal(response.code);
    }
  };
//media permissions to switch on the camera and audio
  const initWebRTC = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStreamObject(stream);

        peer = new Peer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });

        if (!isAdmin) {
          getJoiningCode();
        }

        peer.on("signal", async (data) => {
          if (isAdmin) {
            let payload = {
              id,
              signalData: data,
            };
            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
          } else {
            socket.emit("code", { code: data, url }, (cbData) => {
              console.log("code sent");
            });

          }
        });

        peer.on("connect", () => {
          // wait for 'connect' event before using the data channel
        });

        peer.on("data", (data) => {
          clearTimeout(Timeout);
          chatListReducer({
            type: "addMessage",
            payload: {
              user: "other",
              msg: data.toString(),
              time: Date.now(),
            },
          });
//function for alerting text
          setChatAlert({
            alert: true,
            isPopup: true,
            payload: {
              user: "other",
              msg: data.toString(),
            },
          });

          Timeout = setTimeout(() => {
            setChatAlert({
              ...chatAlert,
              isPopup: false,
              payload: {},
            });
          }, 10000);
        });

        peer.on("stream", (stream) => {
          // got remote video stream, now let's show it in a video tag
          let video = document.querySelector("video");

          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }

          video.play();
        });

      })
      .catch(() => { });
  };

  const sendMsg = (msg) => {
    peer.send(msg);
    chatListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });
  };
//function to enable screensharing currently works only for one chrome tab
  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObject.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObject
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObject.getVideoTracks()[0],
            streamObject
          );
        };
        setIsPresenting(true);
      });
  };
//function for stopping screensharing
  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObject.getVideoTracks()[0],
      streamObject
    );
    setIsPresenting(false);
  };

  //fucntion for muting 
  const toggleAudio = (value) => {
    streamObject.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const toggleVideo = (value) => {
     streamObject.getVideoTracks()[0].enabled = value;
       //!streamObject.getVideoTracks()[0].enabled;
  }
//function for ending call
  const disconnectCall = () => {
    peer.destroy();
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="calling-wrap">
      <video className="video-wrap" src="" controls></video>

      <CallingHead
        isChat={isChat}
        setIsChat={setIsChat}
        chatAlert={chatAlert}
        setChatAlert={setChatAlert}
      />
      <CallingFoot
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        toggleAudio={toggleAudio}
        disconnectCall={disconnectCall}
        toggleVideo = {toggleVideo}
      />

      {isAdmin && meetInfo && (
        <MeetingInfo setMeetInfo={setMeetInfo} url={url} />
      )}
      {isChat ? (
        <Chat
          setIsChat={setIsChat}
          sendMsg={sendMsg}
          chatList={chatList}
        />
      ) : (
        chatAlert.isPopup && <Alert chatAlert={chatAlert} />
      )}
    </div>
  );
};
export default Calling;

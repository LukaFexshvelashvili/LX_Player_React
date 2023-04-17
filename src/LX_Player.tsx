import { useRef, useState } from "react";
import "./LX_Player.css";

function LX_Player() {
  const iconPaths = {
    onPause:
      "M17.8371 8.75001C19.2128 9.51115 19.2128 11.4889 17.8371 12.25L5.96826 18.817C4.63526 19.5545 3 18.5904 3 17.067L3 3.93302C3 2.40958 4.63526 1.44549 5.96826 2.18303L17.8371 8.75001Z",
    onPlay:
      "M9.31875 16.7213V4.27875C9.31875 3.0975 8.82 2.625 7.56 2.625H4.38375C3.12375 2.625 2.625 3.0975 2.625 4.27875V16.7213C2.625 17.9025 3.12375 18.375 4.38375 18.375H7.56C8.82 18.375 9.31875 17.9025 9.31875 16.7213ZM18.3767 16.7213V4.27875C18.3767 3.0975 17.878 2.625 16.618 2.625H13.4417C12.1905 2.625 11.683 3.0975 11.683 4.27875V16.7213C11.683 17.9025 12.1817 18.375 13.4417 18.375H16.618C17.878 18.375 18.3767 17.9025 18.3767 16.7213Z",
  };
  const LX_Player_Container = useRef<HTMLDivElement>(null);
  const LX_Video = useRef<HTMLVideoElement>(null);

  const [playIcon, setPlayIcon] = useState<string>(iconPaths.onPause);

  const LX_Play = () => {
    if (LX_Video.current?.paused) {
      LX_Video.current.play();
      setPlayIcon(iconPaths.onPlay);
    } else {
      LX_Video.current?.pause();
      setPlayIcon(iconPaths.onPause);
    }
  };
  const LX_Fullscreen = () => {
    if (document.fullscreenElement == null) {
      LX_Player_Container.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={LX_Player_Container} className="LX_Player">
      <video
        ref={LX_Video}
        onClick={LX_Play}
        src="https://cdn17.croconet.ge/serial/Demon-Slayer-Kimetsu-no-Yaiba/sezon-1/24_Epizodi_600.mp4"
      ></video>
      <div className="LX_Controls_Fade" onClick={LX_Play}></div>
      <div className="LX_Controls_Content">
        <div className="LX_Progress"></div>
        <div className="LX_Controls">
          <div className="LX_LeftSide">
            <div className="LX_Play" onClick={LX_Play}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_5_2)">
                    <path d={playIcon} fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_2">
                      <rect width="21" height="21" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {/* <path
                  d=
                  fill="white"
                /> */}
              </svg>
            </div>
          </div>
          <div className="LX_RightSide">
            <div className="LX_Fullscreen" onClick={LX_Fullscreen}>
              <svg
                width="25"
                height="21"
                viewBox="0 0 25 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="2" width="2" height="6" rx="1" fill="white" />
                <path
                  d="M1 3C1 2.44772 1.44772 2 2 2H7C7.55228 2 8 2.44772 8 3C8 3.55228 7.55228 4 7 4H1V3Z"
                  fill="white"
                />
                <rect x="1" y="13" width="2" height="6" rx="1" fill="white" />
                <rect x="1" y="17" width="7" height="2" rx="1" fill="white" />
                <rect x="21" y="13" width="2" height="6" rx="1" fill="white" />
                <rect x="16" y="17" width="7" height="2" rx="1" fill="white" />
                <rect x="21" y="2" width="2" height="6" rx="1" fill="white" />
                <rect x="16" y="2" width="7" height="2" rx="1" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LX_Player;
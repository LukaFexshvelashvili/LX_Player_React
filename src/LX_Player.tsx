import { useRef, useState, useEffect } from "react";
import "./LX_Player.css";

function LX_Player() {
  const LX_TimeOut = useRef<any>();
  const returnTime = (time: number) => {
    time = Math.floor(time);
    if (time >= 60) {
      return (
        (Math.floor(time / 60) < 10
          ? "0" + Math.floor(time / 60)
          : Math.floor(time / 60)) +
        ":" +
        (time % 60 < 10 ? "0" + (time % 60) : time % 60)
      );
    }
  };
  const iconPaths = {
    onPause:
      "M17.8371 8.75001C19.2128 9.51115 19.2128 11.4889 17.8371 12.25L5.96826 18.817C4.63526 19.5545 3 18.5904 3 17.067L3 3.93302C3 2.40958 4.63526 1.44549 5.96826 2.18303L17.8371 8.75001Z",
    onPlay:
      "M9.31875 16.7213V4.27875C9.31875 3.0975 8.82 2.625 7.56 2.625H4.38375C3.12375 2.625 2.625 3.0975 2.625 4.27875V16.7213C2.625 17.9025 3.12375 18.375 4.38375 18.375H7.56C8.82 18.375 9.31875 17.9025 9.31875 16.7213ZM18.3767 16.7213V4.27875C18.3767 3.0975 17.878 2.625 16.618 2.625H13.4417C12.1905 2.625 11.683 3.0975 11.683 4.27875V16.7213C11.683 17.9025 12.1817 18.375 13.4417 18.375H16.618C17.878 18.375 18.3767 17.9025 18.3767 16.7213Z",
    onUnmute: [
      "M15.75 14.6563C15.6281 14.6563 15.5087 14.6223 15.405 14.5582C15.3013 14.4942 15.2175 14.4025 15.163 14.2935C15.1085 14.1845 15.0855 14.0624 15.0964 13.9411C15.1073 13.8197 15.1519 13.7038 15.225 13.6063C15.894 12.7088 16.2553 11.6194 16.2553 10.5C16.2553 9.38065 15.894 8.29121 15.225 7.39375C15.1206 7.25451 15.0757 7.07949 15.1003 6.90719C15.125 6.7349 15.217 6.57943 15.3563 6.475C15.4955 6.37057 15.6705 6.32573 15.8428 6.35035C16.0151 6.37496 16.1706 6.46701 16.275 6.60625C17.99 8.89875 17.99 12.1013 16.275 14.3938C16.1438 14.5688 15.9513 14.6563 15.75 14.6563Z",
      "M17.3495 16.8438C17.2276 16.8438 17.1082 16.8098 17.0045 16.7457C16.9008 16.6817 16.817 16.59 16.7625 16.481C16.708 16.372 16.685 16.25 16.6959 16.1286C16.7068 16.0072 16.7514 15.8913 16.8245 15.7938C19.1607 12.6788 19.1607 8.32126 16.8245 5.20626C16.7201 5.06702 16.6752 4.892 16.6998 4.7197C16.7245 4.5474 16.8165 4.39194 16.9557 4.28751C17.095 4.18308 17.27 4.13824 17.4423 4.16285C17.6146 4.18747 17.7701 4.27952 17.8745 4.41876C20.5607 7.99751 20.5607 13.0025 17.8745 16.5813C17.752 16.7563 17.5507 16.8438 17.3495 16.8438ZM12.2675 3.30926C11.2875 2.76676 10.0362 2.90676 8.75875 3.70301L6.20375 5.30426C6.02875 5.40926 5.8275 5.47051 5.62625 5.47051H4.375C2.2575 5.47051 1.09375 6.63426 1.09375 8.75176V12.2518C1.09375 14.3693 2.2575 15.533 4.375 15.533H5.62625C5.8275 15.533 6.02875 15.5943 6.20375 15.6993L8.75875 17.3005C9.52875 17.7818 10.2812 18.018 10.9812 18.018C11.4306 18.022 11.8735 17.9105 12.2675 17.6943C13.2387 17.1518 13.7812 16.023 13.7812 14.518V6.48551C13.7812 4.98051 13.2387 3.85176 12.2675 3.30926Z",
    ],
    onMute: [
      "M15.75 14.6563C15.6281 14.6563 15.5087 14.6223 15.405 14.5582C15.3013 14.4942 15.2175 14.4025 15.163 14.2935C15.1085 14.1845 15.0855 14.0624 15.0964 13.9411C15.1073 13.8197 15.1519 13.7038 15.225 13.6063C15.7659 12.8831 16.1085 12.0312 16.219 11.135C16.3295 10.2387 16.2041 9.32912 15.855 8.49625C15.7881 8.33609 15.7873 8.15594 15.8529 7.99522C15.9185 7.83451 16.0451 7.70634 16.205 7.63875C16.5375 7.49875 16.9225 7.65625 17.0625 7.98875C17.955 10.1063 17.6488 12.565 16.275 14.4025C16.1438 14.5688 15.9513 14.6563 15.75 14.6563Z",
      "M17.3495 16.8438C17.2276 16.8438 17.1082 16.8098 17.0045 16.7458C16.9008 16.6817 16.817 16.59 16.7625 16.481C16.708 16.372 16.685 16.25 16.6959 16.1286C16.7068 16.0072 16.7514 15.8913 16.8245 15.7938C18.697 13.3 19.1083 9.95751 17.9008 7.07876C17.8338 6.9186 17.8331 6.73844 17.8987 6.57773C17.9643 6.41702 18.0909 6.28884 18.2507 6.22126C18.5832 6.08126 18.9682 6.23876 19.1082 6.57126C20.4995 9.87876 20.027 13.7113 17.8745 16.5813C17.752 16.7563 17.5507 16.8438 17.3495 16.8438ZM12.285 11.3383C12.8362 10.787 13.7812 11.1808 13.7812 11.9595V14.5233C13.7812 16.0283 13.2388 17.157 12.2675 17.6995C11.8735 17.9158 11.4306 18.0272 10.9813 18.0233C10.2813 18.0233 9.52875 17.787 8.75875 17.3058L8.19875 16.9558C7.72625 16.6583 7.6475 15.9933 8.04125 15.5995L12.285 11.3383ZM19.0488 1.95038C18.7863 1.68788 18.3575 1.68788 18.095 1.95038L13.7637 6.28163C13.7112 4.88163 13.1863 3.83163 12.2588 3.31538C11.2788 2.77288 10.0275 2.91288 8.75 3.70913L6.20375 5.30163C6.02875 5.40663 5.8275 5.46788 5.62625 5.46788H4.375C2.2575 5.46788 1.09375 6.63163 1.09375 8.74913V12.2491C1.09375 14.3666 2.2575 15.5304 4.375 15.5304H4.515L1.9425 18.1029C1.68 18.3654 1.68 18.7941 1.9425 19.0566C2.0825 19.1791 2.24875 19.2491 2.42375 19.2491C2.59875 19.2491 2.765 19.1791 2.89625 19.0479L19.0488 2.89538C19.32 2.63288 19.32 2.21288 19.0488 1.95038Z",
    ],
  };
  const LX_Player_Container = useRef<HTMLDivElement>(null);
  const LX_Progress = useRef<any>(null);
  const LX_Progress_Line = useRef<any>(null);
  const LX_Video = useRef<any>(null);
  const LX_Mini_Video = useRef<any>(null);

  const LX_Controls_Fade = useRef<any>(null);
  const LX_Controls_Content = useRef<any>(null);

  const LX_TimeShow = useRef<any>(null);
  const LX_TimePrint = useRef<any>(null);
  const LX_SLine = useRef<any>(null);

  const LX_Volume_Slider_Container = useRef<any>(null);
  const LX_Volume_Slide = useRef<any>(null);

  const [playIcon, setPlayIcon] = useState<string>(iconPaths.onPause);
  const [volumeIcon, setVolumeIcon] = useState<string[]>(iconPaths.onUnmute);
  useEffect(() => {
    const mouseMoving = () => {
      clearTimeout(LX_TimeOut.current);
      LX_TimeOut.current = setTimeout(() => {
        hideControls();
      }, 3000);

      LX_Controls_Fade.current.style.visibility = "visible";
      LX_Controls_Fade.current.style.opacity = 1;
      LX_Controls_Content.current.style.visibility = "visible";
      LX_Controls_Content.current.style.opacity = 1;
    };
    LX_Player_Container.current?.addEventListener("mousemove", mouseMoving);
    const hideControls = () => {
      LX_Controls_Fade.current.style.visibility = "hidden";
      LX_Controls_Fade.current.style.opacity = 0;
      LX_Controls_Content.current.style.visibility = "hidden";
      LX_Controls_Content.current.style.opacity = 0;
    };

    const timeUpdate = () => {
      var getPer =
        (LX_Video.current?.currentTime * 100) / LX_Video.current?.duration;
      LX_Progress_Line.current.style.width = getPer + "%";
    };
    const VolumeSlide = (e: any) => {
      var Y_Height =
        LX_Volume_Slider_Container.current.clientHeight -
        (LX_Volume_Slider_Container.current.clientHeight / 100) * e.offsetY;
      LX_Volume_Slide.current.style.height = Y_Height + "%";
      LX_Video.current.volume = Y_Height / 100 < 0.05 ? 0 : Y_Height / 100;
    };
    const setTime = (e: any) => {
      var getPers = (e.offsetX / LX_Progress.current?.clientWidth) * 100;
      LX_Progress_Line.current.style.width = getPers + "%";
      LX_Video.current.currentTime =
        (LX_Video.current?.duration / 100) * getPers;
    };
    const getTime = (e: any) => {
      var getPersq = (e.offsetX / LX_Progress.current?.clientWidth) * 100;
      if (LX_TimeShow.current.style.opacity == 0) {
        LX_TimeShow.current.style.visibility = "visible";
        LX_TimeShow.current.style.opacity = 1;
      }
      var getPerc =
        ((e.offsetX - LX_TimeShow.current.clientWidth / 2) /
          LX_Progress.current?.clientWidth) *
        100;
      LX_Mini_Video.current.currentTime =
        (LX_Video.current?.duration / 100) * getPersq;
      LX_TimePrint.current.textContent = returnTime(
        (LX_Video.current?.duration / 100) * getPerc
      );
      LX_TimeShow.current.style.left = getPerc + "%";

      LX_SLine.current.style.width =
        (e.offsetX / LX_Progress.current?.clientWidth) * 100 + "%";
    };

    const offLine = () => {
      LX_TimeShow.current.style.visibility = "hidden";
      LX_TimeShow.current.style.opacity = 0;
      LX_SLine.current.style.width = 0;
      LX_Progress.current?.removeEventListener("mousemove", slideSet);
    };

    LX_Video.current?.addEventListener("timeupdate", timeUpdate);
    LX_Progress.current?.addEventListener("click", (e: any) => setTime(e));
    LX_Progress.current?.addEventListener("mousemove", (e: any) => getTime(e));
    LX_Progress.current?.addEventListener("mousedown", function () {
      LX_Progress.current?.addEventListener("mousemove", slideSet);
    });
    LX_Progress.current?.addEventListener("mouseup", function () {
      LX_Progress.current?.removeEventListener("mousemove", slideSet);
    });
    LX_Progress.current?.addEventListener("mouseleave", offLine);

    LX_Volume_Slider_Container.current?.addEventListener(
      "mousedown",
      function () {
        LX_Volume_Slider_Container.current?.addEventListener(
          "mousemove",
          VolumeSlide
        );
      }
    );
    LX_Volume_Slider_Container.current?.addEventListener(
      "mouseup",
      function () {
        LX_Volume_Slider_Container.current?.removeEventListener(
          "mousemove",
          VolumeSlide
        );
      }
    );
    LX_Volume_Slider_Container.current?.addEventListener(
      "mouseleave",
      function () {
        LX_Volume_Slider_Container.current?.removeEventListener(
          "mousemove",
          VolumeSlide
        );
      }
    );
    return () => {
      LX_Player_Container.current?.removeEventListener(
        "mousemove",
        mouseMoving
      );
      clearTimeout(LX_TimeOut.current);
    };
  }, []);
  const LX_Play = () => {
    if (LX_Video.current?.paused) {
      LX_Video.current.play();
      setPlayIcon(iconPaths.onPlay);
    } else {
      LX_Video.current?.pause();
      setPlayIcon(iconPaths.onPause);
    }
  };
  const slideSet = (y: any) => {
    var getPers = (y.offsetX / LX_Progress.current?.clientWidth) * 100;
    LX_Progress_Line.current.style.width = getPers + "%";
    LX_Video.current.currentTime = (LX_Video.current?.duration / 100) * getPers;
  };
  const LX_Fullscreen = () => {
    if (document.fullscreenElement == null) {
      LX_Player_Container.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const LX_Volume = () => {
    if (LX_Video.current.volume == 0) {
      setVolumeIcon(iconPaths.onUnmute);
      LX_Video.current.volume = 1;
    } else {
      setVolumeIcon(iconPaths.onMute);
      LX_Video.current.volume = 0;
    }
  };

  return (
    <div ref={LX_Player_Container} className="LX_Player">
      <video
        ref={LX_Video}
        onClick={LX_Play}
        src="https://cdn17.croconet.ge/serial/Demon-Slayer-Kimetsu-no-Yaiba/sezon-1/24_Epizodi_600.mp4"
      ></video>
      <div
        ref={LX_Controls_Fade}
        className="LX_Controls_Fade"
        onClick={LX_Play}
      ></div>
      <div ref={LX_Controls_Content} className="LX_Controls_Content">
        <div ref={LX_Progress} className="LX_Progress">
          <div className="LX_TimeShow" ref={LX_TimeShow}>
            <video
              ref={LX_Mini_Video}
              src="https://cdn17.croconet.ge/serial/Demon-Slayer-Kimetsu-no-Yaiba/sezon-1/24_Epizodi_600.mp4"
              className="LX_Mini_Video"
            ></video>
            <span className="LX_TimePrint" ref={LX_TimePrint}>
              00:00
            </span>
          </div>

          <div className="LX_Progress_BLine"></div>
          <div className="LX_Progress_SLine" ref={LX_SLine}></div>
          <div ref={LX_Progress_Line} className="LX_Progress_Line"></div>
        </div>
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
                  <g clipPath="url(#clip0_5_2)">
                    <path d={playIcon} fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5_2">
                      <rect width="21" height="21" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </svg>
            </div>
            <div className="LX_Volume">
              <div className="LX_Volume_Slider">
                <div
                  ref={LX_Volume_Slider_Container}
                  className="LX_Volume_Slider_Container"
                >
                  <div ref={LX_Volume_Slide} className="LX_Volume_Slide"></div>
                </div>
              </div>
              <svg
                onClick={LX_Volume}
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={volumeIcon[0]} fill="white" />
                <path d={volumeIcon[1]} fill="white" />
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

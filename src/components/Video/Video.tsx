import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const Video = () => {
  const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>;

  //第一個useEffect用來判斷影片是否在視窗內，如果在視窗內，則播放影片，如果不在視窗內，則暫停影片

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      //區間 30%~70%
      threshold: [0.3, 0.7],
    };

    //進入區間時，播放影片 退出區間時，暫停影片
    const handlePlay = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          console.log("over 30%");
          videoRef.current?.play();
        } else {
          console.log("less than 30%");
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handlePlay, options);
    if (videoRef.current) observer.observe(videoRef.current);

    // 清除 IntersectionObserver
    return () => {
      observer.disconnect();
    };
  }, [videoRef]);

  //第二個useEffect用來判斷影片是否在視窗內
  // 如果當前影片 沒有在視窗內，則將影片的時間重置為0 ，
  // 為了達到 時間暫停 與 時間重置 ， 所以另外寫一個resetObserver去判斷 threshold 是否為不等於0 (100%)

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0,
    };

    const handleReset = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (!entry.isIntersecting) {
          console.log("cant see the vedio");
          videoRef.current!.currentTime = 0;
        }
      });
    };

    const resetObserver = new IntersectionObserver(handleReset, options);
    if (videoRef.current) resetObserver.observe(videoRef.current);
    // 清除 IntersectionObserver
    return () => {
      resetObserver.disconnect();
    };
  }, [videoRef]);

  return (
    <>
      <Box w="100%">
        <Flex w="100%" align="center" bg="teal.500">
          <video ref={videoRef} autoPlay muted controls loop style={{ margin: 0, padding: 0, width: "1440px" }}>
            <source src="/assets/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Flex>
      </Box>
    </>
  );
};

export default Video;

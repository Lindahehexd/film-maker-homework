import { Flex, Box, Image } from "@chakra-ui/react";
import { useRef } from "react";
import { items } from "./cardsData";

const ScrollCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  //定義滾動功能

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const { current: container } = containerRef;
    if (container) {
      e.stopPropagation();
      container.scrollBy({
        left: e.deltaY < 0 ? -30 : 30,
      });
    }
  };

  return (
    <Box w="100%" overflowY="hidden">
      <Flex maxW="100%" mb="273px" ml="40px">
        <Flex
          ref={containerRef}
          onWheel={handleWheel}
          overflowX="auto"
          overscrollBehavior="contain"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          // 用display:none的方式隱藏滾動條 (overflowX如果用hidden會無法用contain) 然後用contain限制區塊外面(瀏覽器)的垂直滾動
        >
          {items.map((item) => (
            <Box key={item.id} flexShrink="0">
              <Image src={item.src} h="800px" w="400px" mr="30px" />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ScrollCards;

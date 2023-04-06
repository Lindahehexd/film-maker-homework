import { useState } from "react";
import { Box, Flex, Image, keyframes } from "@chakra-ui/react";

const ShuffleCard = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [isCard2Moved, setIsCard2Moved] = useState(false);
  const [index, setIndex] = useState(1);

  // init state = 0 , so the animation wont be triggered in the first render
  const [init, setInit] = useState(0);

  //first click
  const LeftCardStart = keyframes`
    0% {
        transform: translateX(0);
    }
    50%{
        transform: scale(1.3) translateX(-100px) perspective(300px) rotateY(10deg);
    }
    
    100% {
        transform: scale(1.2) translate(200px, -10px);
    }
    `;

  const RightCardStart = keyframes`
    0% {
    transform: translateX(0);
    }
    50%{
    transform: translateX(300px) ;
    }
    100% {
    transform: scale(0.7) translate(0px, 50px);
    }
    `;

  //second click

  const LeftCardBack = keyframes`
    from {
    transform: translateX(100px);
    }
    50%{
        transform: translateX(-300px) ;
    }
    to {
        transform: scale(0.7) translate(120px,60px)
    }
    `;

  const RightCardBack = keyframes`
    0% {
    transform: translateX(0);
    }
    50%{
    transform:  translateX(200px) perspective(300px) rotateY(-10deg);
    }

    100% {
    transform: scale(1.3) translate(-150px, -180px);
    }
    `;

  //@ logic :
  //  setInit value to prevent the animation from being triggered in the first render
  //  making animation by changing the state (isMoved / isCard2Moved / index)
  //  making which card on top by changing the zindex value

  const handleClick = () => {
    setIsMoved(!isMoved); //trigger animation for card 1 (start and back)
    setIsCard2Moved(!isCard2Moved); //trigger animation for card2 (start and back)
    setIndex(index === 1 ? 2 : 1); // change the zindex value when clicked
    setInit(1); // set init value from 0 to 1 to trigger the animation
  };

  return (
    <Box w="100%">
      <Flex w="100%" justify="center" object-fit="contain" align="center" mt="233px">
        <Image
          ml="300px"
          objectFit="cover"
          src="/assets/img2.png"
          onClick={handleClick}
          animation={`${
            isMoved && init > 0 ? LeftCardStart : !isMoved && init > 0 ? LeftCardBack : ""
          } 0.8s ease-out forwards`}
          h="474px"
          w="713px"
          backgroundColor="green.300"
          borderRadius="20px"
          boxShadow="10px 10px 25px rgba(0,0,0,0.25) "
          position="relative"
          transition="left 1s ease-out"
          cursor="pointer"
          zIndex={index === 1 ? 1 : 2}
        />

        <Image
          objectFit="cover"
          src="/assets/img1.png"
          onClick={handleClick}
          animation={`${
            isCard2Moved && init > 0 ? RightCardStart : !isCard2Moved && init > 0 ? RightCardBack : ""
          } 0.8s  ease-out forwards`}
          h="320px"
          w="811px"
          backgroundColor="purple.300"
          borderRadius="20px"
          boxShadow="10px 10px 25px rgba(0,0,0,0.25) "
          position="relative"
          transition="left 1s ease-out"
          cursor="pointer"
          right="19rem"
          top="12rem"
          zIndex={index === 1 ? 2 : 1}
        />
      </Flex>
    </Box>
  );
};

export default ShuffleCard;

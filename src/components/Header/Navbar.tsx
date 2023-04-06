import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollTop = window.scrollY;
      setScrollTop(currentScrollTop);
    };

    // check the current scroll position value
    // console.log("scrollTop: ", scrollTop);

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Box
      w="1440px"
      h="96px"
      bg="white"
      transition="all 0.8s ease-in"
      opacity={scrollTop > 300 ? 0 : 1}
      transform={scrollTop > 300 ? "translateY(-150%)" : ""}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      zIndex={100}
    >
      <Text as="i" fontWeight={700} fontSize="40px">
        Film Maker
      </Text>
    </Box>
  );
};

export default Navbar;

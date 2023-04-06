import { Flex } from "@chakra-ui/react";
import Navbar from "../Header/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    //outer container
    <Flex justify="center" w="100%" height="4592px">
      {/* //inner container */}
      <Flex w="1440px" h="100%" justify="center">
        {/* //innermost  container */}
        <Flex w="100%" direction="column">
          <Navbar />
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;


import ScrollCards from "./HorizontalCards/ScrollCards";
import Layout from "./Layout/Layout";
import ShuffleCard from "./ShuffleCards/ShuffleCard";
import TextSession1 from "./TransitionText/TextSession1";
import TextSession2 from "./TransitionText/TextSession2";
import Video from "./Video/Video";

const AppContainer = () => {
  return (
    <Layout>
      <ShuffleCard />
      <TextSession1 />
      <Video />
      <TextSession2 />
      <ScrollCards />
    </Layout>
  );
};

export default AppContainer;



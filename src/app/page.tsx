
import Navigate from "@/components/Navigate";
import { DefaultLayout } from "@/layouts";
import HomePage from "@/views/Home/HomePage";
const Home = () => {
  return (
    // <DefaultLayout>
    //   <HomePage/>
    // </DefaultLayout>
    <Navigate to="/blog" replace/>
  );
};
export default Home;

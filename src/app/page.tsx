import { ButtonThem } from "@/components/ButtonTheme";
import { DefaultLayout } from "@/layouts";
import HomePage from "@/views/Home/HomePage";
const Home = () => {
  return (
    <DefaultLayout>
      <ButtonThem />
      <HomePage/>
    </DefaultLayout>
  );
};
export default Home;

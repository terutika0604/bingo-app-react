import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="home-div">
      <h1>TOPページ</h1>
      <div>
        masterは<Link to={`/master/`}>こちら</Link>
      </div>
      <div>
      childredは<Link to={`/children/`}>こちら</Link>
      </div>
    </div>
  );
};

export default Home;
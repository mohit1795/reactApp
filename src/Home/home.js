import logo from '../githubLogo.png';
import './home.css';
import AutoComplete from './AutoComplete';

function Home() {
  return (
    <div className="home">
      <header className="body">
        <img src={logo} className="home-logo" alt="" />
      </header>
      <div className="autoComplete">
        <AutoComplete />
      </div>
    </div>
  );
}

export default Home;

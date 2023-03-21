import NavBar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Profile from "./components/profile/Profile";
import Buttons from "./components/buttons/Buttons";
import DroneSpecs from "./components/droneSpecs/DroneSpecs";
import NewVideoUpload from "./components/newVideo/NewVideoUpload";

import "./App.css";

const App = () => {
  return (
    <>
      <Sidebar />
      <NavBar className="navbar" />
      <div className="container">
        <div className="profile">
          <Profile />
        </div>
        <div className="drone-specs">
          <DroneSpecs />
        </div>
        <div className="buttons">
          <Buttons />
        </div>
        <div className="new-video">
          <NewVideoUpload channelId="UCunJxkIQ2lUhozJXuuzvyag" />
        </div>
      </div>
    </>
  );
};

export default App;

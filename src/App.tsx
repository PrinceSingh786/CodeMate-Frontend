import "./index.css";
import Body from "./components/Body";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import useSilentAuth from "./Utils/useSilentAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import components for routes
import Feed from "./components/Feed";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Profile from "./components/Profile";

const AppContent = () => {
  const isLoading = useSilentAuth();

  // Render a loading indicator, a skeleton screen, or null while authenticating
  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  return (
    <BrowserRouter basename="/">
      <NavBar />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignIn />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <AppContent />
    </Provider>
  );
}

export default App;

import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import type { RootState } from "../Utils/appStore";

const Profile = () => {
  const user = useSelector((store: RootState) => store.user);
  return <div>{user && <EditProfile user={user} />}</div>;
};

export default Profile;

import { API_URL } from "../Utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Utils/feedSlice";
interface User {
  _id: string;
  name: string;
  photo?: string;
  bio: string;
  gender: string;
  age: number;
  // add other fields as needed
}

type UserCardProps = {
  user: User;
  onReview?: () => void; // <-- add this
};

const UserCard = ({ user, onReview }: UserCardProps) => {
  const dispatch = useDispatch();
  const handlerequest = async (_id: string, status: string) => {
    try {
      await axios.post(
        API_URL + "/sendconnectionrequest/" + _id + "/" + status,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(user._id));
      if (onReview) onReview(); // <-- call onReview if provided
    } catch (err) {
      console.log(err);
      // Optionally handle error
    }
  };

  const { name, photo, bio, age, gender, _id } = user;
  if (user == null) {
    return <div>No user found</div>;
  }
  return (
    user && (
      <div className="flex justify-center my-6">
        <div className="card bg-white shadow-lg border border-gray-200 w-full max-w-2xl hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row">
            {/* Photo Section */}
            <div className="md:w-1/3 p-6 flex justify-center items-center">
              <div className="relative">
                <img
                  src={
                    photo ||
                    "https://documents.iplt20.com/ipl/IPLHeadshot2025/2.png"
                  }
                  alt={name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {name}
                </h2>

                <div className="flex items-center gap-4 mb-3 text-gray-600">
                  {age && (
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Age:</span>
                      <span>{age}</span>
                    </div>
                  )}
                  {gender && (
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Gender:</span>
                      <span className="capitalize">{gender}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{bio}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  className="flex-1 btn bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => {
                    handlerequest(_id, "interested");
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Interested
                </button>
                <button
                  className="flex-1 btn bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  onClick={() => {
                    handlerequest(_id, "ignored");
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;

interface User {
  age: number;
  bio: string;
  name: string;
  photo?: string;
  gender: string;
  // add other fields if needed
}
const Connection_Card = ({ user }: { user: User }) => {
  const { age, bio, name, photo, gender } = user;
  return (
    <div className="flex justify-center my-15">
      <div className="card card-side bg-base-100 w-full md:w-8/12  shadow-sm">
        <div className="w-4/12 ">
          <figure>
            {" "}
            <img
              className="w-full h-60 md:h-80 object-cover rounded-lg"
              src={photo}
              alt="Movie"
            />
          </figure>
        </div>

        <div className="card-body w-4/12">
          <h1 className="card-title">
            Name: <span className="font-thin">{name}</span>
          </h1>
          {age && (
            <div className="flex ">
              <h3 className=" font-bold">AGE: </h3>{" "}
              <h3 className="mx-4">{age}</h3>
            </div>
          )}
          {gender && (
            <div className="flex ">
              <h3 className=" font-bold">Gender: </h3>{" "}
              <h3 className="mx-4">{gender}</h3>
            </div>
          )}
          <div className="flex ">
            <h3 className=" font-bold">Bio: </h3>{" "}
            <h3 className="mx-4">{bio}</h3>
          </div>{" "}
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connection_Card;

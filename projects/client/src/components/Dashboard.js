/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useLocation, useHistory } from "react-router-dom";
import CreatePost from "./CreatePost";
import PostListing from "./PostListing";

const Dashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(location.state?.username);
  }, [location]);
  if (!location.state?.username) {
    history.push("/");
  }

  return (
    <>
      {username && (
        <div className="container mt-5">
          <h1>Welcome Back: {location.state.username}</h1>

          <CreatePost params={null} editMode={false} />
          <PostListing />
        </div>
      )}
    </>
  );
};

export default Dashboard;

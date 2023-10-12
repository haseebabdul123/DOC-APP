import React, { useEffect } from "react";
import axios from "axios";
import LayOut from "../components/LayOut";
const Home = () => {
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <LayOut>
      <h1>Home Page</h1>
    </LayOut>
  );
};

export default Home;

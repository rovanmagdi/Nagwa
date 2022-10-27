//import some built in react methods to create the state
import { useEffect, useState } from "react";

// import useNavigate built in react-router-dom from to implement route programmitcally.
import { useNavigate } from "react-router-dom";

// import from MUI
import { Box, Stack, Typography } from "@mui/material";

//import axios to fetch data from server
import axios from "axios";

//import toast from helper to display error
import { toastError } from "../errors/helper";

import { StyledButtonRetake } from "../styled/button";

const Result = () => {
  //Set score to take rank from server
  const [userScore, setUserScore] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //take score from localstorage
    let score: String = localStorage.getItem("score") || "";

    //Check score= 0 , take user to first page(Home page)
    !score && navigate("/");

    axios
      .post("http://localhost:4200/rank", { score: score })
      .then((response) => {
        setUserScore(response.data);
      })
      .catch((err) => {
        toastError(err.message);
      });
  }, [navigate]);

  const handleRetake = () => {
    navigate("/");
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color:"white"
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: "420px",
            height: "300px",
            borderRadius: "10px",
            backgroundColor: "#FF7332",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            gap={2}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.8em",
              }}
            >
              Your Rank is  {userScore} 
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <StyledButtonRetake onClick={handleRetake}>
                Retake it
              </StyledButtonRetake>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Result;

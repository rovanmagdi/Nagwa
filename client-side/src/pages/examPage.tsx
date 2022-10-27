// importing mui used components
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

// import react built in to implement.
import { useEffect, useState } from "react";

// import useNavigate built in react-router-dom from to implement route programmitcally.
import { useNavigate } from "react-router-dom";

//import axios to fetch data from server
import axios from "axios";

//import progrss from component
import ProgressComponent from "../components/progressComponent";

// import soundComponet to used here
import ContainerSound from "../components/containerSound";

// import interfaces to used.
import { questionInterface } from "../types/question";

//import toast from helper to display error or sucess or warning
import { toastWarning, toastError, toastSuccess } from "../errors/helper";

//import buttons from styled MUI
import { StyledButtonNext, StyledButtonCheck } from "../styled/button";

const Home = () => {
  // setting  state
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<questionInterface[]>([]);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [percent, setPercent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [bgColor, setBgColor] = useState(true);
  const [checkAnswer, setIscheckAnswer] = useState(false);
  const [sound, setSound] = useState(false);
  const navigate = useNavigate();

  // answers buttons
  const Buttons = [
    { title: "verb" },
    { title: "adverb" },
    { title: "noun" },
    { title: "adjective" },
  ];

  // fetching Questions from the server
  useEffect(() => {
    axios
      .get("http://localhost:4200/words")
      .then((data) => {
        setQuestions(data.data);
      })
      .catch((err) => {
        toastError(err);
      });
  }, []);

  const handleAnswer = (answer: string) => {
    setAnswer(answer);
  };
  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    setName(name);
  }, [counter]);

  const CheckAnswerHandler = () => {
    if (checkAnswer) {
      toastWarning("You can't answer 2 twice ");
      return;
    }

    if (answer === "" && counter !== 10) {
      toastWarning("You must choose  answer");
    }

    if (answer === questions[counter].pos) {
      setScore((prevQuestion) => (prevQuestion += 10));
      toastSuccess("Answer right ");
      setBgColor(false);
      setIscheckAnswer(true);
    }

    if (answer !== questions[counter].pos && answer !== "") {
      setBgColor(false);
      setIscheckAnswer(true);
      toastError("Answer wrong ");
    }
  };
  const handleNext = () => {
    if (counter === 9) {
      setSound(true);
    }
    if (answer === questions[counter].pos) {
      setScore((prevQuestion) => (prevQuestion += 10));
      setBgColor(false);
      setIscheckAnswer(true);
    }

    if (answer !== questions[counter].pos && answer !== "") {
      setBgColor(false);
      setIscheckAnswer(true);
    }
    setBgColor(true);
    setCounter((counter) => (counter += 1));
    setIscheckAnswer(false);
    handlePercent();
    setAnswer("");
  };

  const handlePercent = () => {
    //Calutate Practice= number of checkAnswer questions / total number of questions)*100
    const lengthQuestions = questions.length;
    setPercent(Math.round(((counter + 1) / lengthQuestions) * 100));
    return percent;
  };

  const handleResult = () => {
    navigate("/result");
    // storing the result in localStorage to be used in result page.
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("statusProgress", "finish");
  };

  return (
    <>
      <Stack
        justifyContent="space-around"
        alignItems="center"
        gap={8}
        height="50%"
      >
        <ProgressComponent precent={percent} />

        {name && (
          <Typography
            component="span"
            sx={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {" "}
            Welcome.. {name}.
          </Typography>
        )}

        <ContainerSound sound={sound}>
          {questions[counter] ? questions[counter].word : "Done !"}
        </ContainerSound>

        {counter < 10 && (
          <Grid container gap={1} justifyContent="center" alignItems="center">
            {/* showing  answers buttons */}
            {Buttons.map((button, uniqueKey) => {
              return (
                <Grid
                  key={uniqueKey}
                  onClick={() => {
                    handleAnswer(button.title);
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor:
                        answer === button.title && bgColor
                          ? "#185f55"
                          : bgColor
                          ? "#FF7332"
                          : questions[counter]?.pos === button.title
                          ? "#5C9E69"
                          : "#E20813",
                      "&:hover": {
                        backgroundColor: "#185f55",
                      },
                    }}
                  >
                    {button.title}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        )}

        <Box component="div" sx={{ fontSize: "1.4rem" }}>
          Your Score is{" "}
          <Box component="span" sx={{ fontWeight: "bold", color: "#185f55" }}>
            {score}{" "}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
          }}
        >
          {counter < 10 && (
            <>
              <StyledButtonCheck onClick={CheckAnswerHandler}>
                Check Answer
              </StyledButtonCheck>

              <StyledButtonNext onClick={handleNext}>
                Next Question
              </StyledButtonNext>
            </>
          )}
          {counter >= 10 && (
            <StyledButtonCheck onClick={handleResult}>
              Show Rank
            </StyledButtonCheck>
          )}
        </Box>
      </Stack>{" "}
    </>
  );
};

export default Home;

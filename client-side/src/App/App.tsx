import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import Loader from "../components/loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectProgress, ProtectResult } from "../guards/route";
import { Box } from "@mui/material";
import backgroundImgae from "../assets/background.png";
//Lazt loading better performance
const Start = lazy(() => import("../pages/startPage"));
const Exam = lazy(() => import("../pages/examPage"));
const Result = lazy(() => import("../pages/resultPage"));
const NotFoundPage = lazy(() => import("../pages/notFoundPage"));

function App() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImgae})`,
        fontFamily: "Raleway",
      }}
    >
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                
                  <Start />
             
              }
            />
            <Route
              path="/exam"
              element={
                <ProtectProgress>
                  <Exam />
                </ProtectProgress>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectResult>
                  <Result />
                </ProtectResult>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </Box>
  );
}

export default App;

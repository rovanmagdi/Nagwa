import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import NotFoundImage from "../assets/not found.svg";

function NotFound() {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "600px",
        }}
      >
        <Box
          component="img"
          src={NotFoundImage}
          sx={{ width: "80%", height: "80%" }}
        />
      </Stack>
    </>
  );
}

export default NotFound;

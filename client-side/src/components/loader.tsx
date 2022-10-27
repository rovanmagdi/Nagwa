import { Stack } from "@mui/system";
import { CircularProgress } from "@mui/material";
const Loader = () => {
  return (
    <Stack
      sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loader;

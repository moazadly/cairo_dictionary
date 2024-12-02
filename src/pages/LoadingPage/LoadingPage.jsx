import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingPage() {
  return (
    <Stack
      sx={{
        height: "94vh",
        mt: -9,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CircularProgress size="3rem" />
    </Stack>
  );
}

export default LoadingPage;

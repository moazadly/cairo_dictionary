import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.css";
function ButtonCompnent({
  text = "فارغ",
  rounded = false,
  icon = false,
  onclick,
}) {
  const roundedStyle = rounded
    ? { borderRadius: "20px" }
    : { borderRadius: "6px" };
  return (
    <div className={styles.no_print}>
      <Button
        onClick={() => {
          onclick && onclick();
        }}
        variant="contained"
        sx={{
          background: "linear-gradient(to right, #0F2D4D, #2369B3)",
          fontSize: "16px",
          fontFamily: "El Messiri",
          width: "100%",
        }}
        startIcon={icon && <AddIcon sx={{ marginLeft: "10px" }} />}
        style={roundedStyle}
      >
        {text}
      </Button>
    </div>
  );
}

export default ButtonCompnent;

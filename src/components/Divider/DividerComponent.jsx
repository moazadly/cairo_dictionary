import img from "../../assets/images/ض.png";
import styles from "./style.module.css";
import Box from "@mui/material/Box";
function DividerComponent() {
  return (
    <Box marginY={12}>
      <hr />
      <span className={styles.span}>
        <img src={img} alt="" style={{ width: "100px", height: "60px" }} />
      </span>
    </Box>
  );
}

export default DividerComponent;

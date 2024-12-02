import {
  Box,
  CircularProgress,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import login_background from "../../assets/images/login_background.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const message = useSelector((state) => state.user.message);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: message,
        confirmButtonText: "موافق", // Change the button text here
      });
    }
  }, [error]);
  const handleLogin = async () => {
    if (!name || !password) {
      Swal.fire({
        title: "يرجي كتابة كلمه السر و اسم المستخدم  ",
        confirmButtonText: "موافق", // Change the button text here
      });
    } else {
      const logined = await dispatch(loginUser({ code: name, password }));
      console.log(logined.payload);
      if (logined.payload.data) {
        navigate(`/firstPage`);
      }
      setName("");
      setPassword("");
    }
  };
  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={{ xs: "center", lg: "initial" }}
      display={{ xs: "flex" }}
      color={"#FFFFFF"}
      height={"100vh"}
      sx={{
        background: {
          lg: `url(${login_background}) no-repeat`,
        },
        backgroundSize: { lg: "contain" },
        backgroundPositionY: { lg: "100%" },
      }}
    >
      <Stack
        spacing={3}
        my={4}
        p={4}
        sx={{
          background: "#1A3553",
          borderRadius: { sm: "5px" },
          textAlign: "center",
        }}
        height={{ xs: "55%", lg: "55%", xl: "45%" }}
        width={{ xs: "70%", sm: "60%", lg: "25%" }}
      >
        <Typography variant="h2" fontFamily={"El Messiri"}>
          تسجيل الدخول
        </Typography>
        <InputField label="اسم المستخدم" text={true} set={setName} val={name} />
        <InputField
          label="كلمة المرور"
          text={true}
          type="password"
          set={setPassword}
          val={password}
        />
        <Stack sx={{ width: "50%", margin: "auto auto 0 auto !important" }}>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            loadingIndicator={
              <CircularProgress
                size={24}
                sx={{
                  color: "#ffffff", // Change spinner color
                }}
              />
            }
            // loadingPosition="start"
            sx={{
              width: "100%",
              background: "linear-gradient(to right, #0F2D4D, #2369B3)",
              borderRadius: "5px",
              mt: 6,
              fontSize: "20px",
              "&.MuiLoadingButton-loading": {
                background: "linear-gradient(to right, #0F2D4D, #2369B3)", // Keep the background color during loading
              },
            }}
            onClick={handleLogin}
          >
            الدخول
          </LoadingButton>
        </Stack>
      </Stack>
    </Grid2>
  );
}

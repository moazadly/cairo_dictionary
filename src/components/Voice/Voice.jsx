import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Voice = ({ setVoice, addRecord, index, initialURL }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(initialURL || null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (initialURL) {
      setAudioURL(initialURL);
    }
  }, [initialURL]);

  const handleStartRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioFile = new File([audioBlob], `recording_${Date.now()}.wav`, {
        type: "audio/wav",
      });

      if (index !== undefined) addRecord(audioFile, index);
      else addRecord(audioFile);

      const newAudioURL = URL.createObjectURL(audioBlob);
      setAudioURL(newAudioURL);
      setVoice(newAudioURL);
    };

    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="no-print">
      {" "}
      <Stack flexDirection={"row"}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #0F2D4D, #2369B3)",
            borderRadius: "5px",
            marginRight: "10px",
            color: "#FFFFFF",
            fontSize: "20px",
            fontFamily: "El Messiri",
          }}
          size="large"
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          endIcon={
            isRecording ? (
              <StopIcon sx={{ color: "#E72929" }} />
            ) : (
              <MicIcon sx={{ color: "white" }} />
            )
          }
        >
          {isRecording ? "انهاء" : audioURL ? "اعادة التسجيل" : "النطق"}
        </Button>

        {audioURL && (
          <Button
            variant="outlined"
            sx={{
              borderRadius: "5px",
              color: "black",
              fontSize: "16px",
              fontFamily: "El Messiri",
              borderColor: "#2369B3",
              borderWidth: "2px",
            }}
            onClick={() => new Audio(audioURL).play()}
          >
            <span
              style={{ color: "black", fontSize: "20px", marginLeft: "15px" }}
            >
              استمع
            </span>
            <PlayArrowIcon sx={{ color: "black", fontSize: "30px" }} />
          </Button>
        )}
      </Stack>
    </div>
  );
};

export default Voice;

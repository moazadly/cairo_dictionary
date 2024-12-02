import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assignedVerbs, assignedWords } from "../../redux/userSlice";
import { Box } from "@mui/material";

export default function AccordionWithWords() {
  const [expanded, setExpanded] = React.useState(false);
  const [selectedWord, setSelectedWord] = React.useState("");
  const words = useSelector((state) => state.user.wordData);
  const nouns = useSelector((state) => state.user.nouns);
  const verbs = useSelector((state) => state.user.verbs);
  const assigned_functional_words = useSelector(
    (state) => state.user.assigned_functional_words
  );

  // const [wordData, setWordData] = React.useState(words || []);
  const [wordData, setWordData] = React.useState([...words] || []);
  const dispatch = useDispatch();

  const handleExpansion = (item, panel) => {
    setSelectedWord(expanded === panel ? "" : item.word);
    setExpanded(expanded === panel ? false : panel);
  };

  // Move meaning up
  const moveMeaningUp = (wordIndex, meaningIndex) => {
    if (meaningIndex === 0) return; // Prevent moving the first meaning up

    // Deep copy the array and nested objects to avoid mutating the original
    let newWordData = wordData.map((word) => ({
      ...word,
      meanings: [...word.meanings],
    }));

    // Swap the meanings
    let temp = newWordData[wordIndex].meanings[meaningIndex];
    newWordData[wordIndex].meanings[meaningIndex] =
      newWordData[wordIndex].meanings[meaningIndex - 1];
    newWordData[wordIndex].meanings[meaningIndex - 1] = temp;

    setWordData(newWordData);
  };

  // Move meaning down
  const moveMeaningDown = (wordIndex, meaningIndex) => {
    if (meaningIndex === wordData[wordIndex].meanings.length - 1) return; // Prevent moving the last meaning down
    const newWordData = wordData.map((word) => ({
      ...word,
      meanings: [...word.meanings],
    }));

    // Swap the meanings
    const temp = newWordData[wordIndex].meanings[meaningIndex];
    newWordData[wordIndex].meanings[meaningIndex] =
      newWordData[wordIndex].meanings[meaningIndex + 1];
    newWordData[wordIndex].meanings[meaningIndex + 1] = temp;

    setWordData(newWordData);
  };

  const navigate = useNavigate();
  const handleAddWord = () => {
    if (nouns.includes(selectedWord)) {
      dispatch(assignedWords());
      navigate("/nounpage");
    }
    if (verbs.includes(selectedWord)) {
      dispatch(assignedVerbs());
      navigate("/verbpage");
    }
    if (assigned_functional_words.includes(selectedWord)) {
    }
  };
  return (
    <div style={{ direction: "rtl" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <h1 style={{ marginRight: 20 }}>الكلمات المسنده الي المحرر</h1>
        <div style={{ marginRight: "auto", marginLeft: 20 }}></div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <div style={{ width: "70%" }}>
          {wordData.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={() => handleExpansion(item, index)}
              TransitionProps={{ timeout: 400 }}
              sx={{
                mb: 1,
                backgroundColor: index % 2 === 0 ? "#E0E0E0" : "#0F2D4D",
                color: index % 2 === 0 ? "#0F2D4D" : "#fff",
                "& .MuiAccordionSummary-root": {
                  backgroundColor: index % 2 === 0 ? "#E0E0E0" : "#0F2D4D",
                },
                "& .MuiAccordionDetails-root": {
                  padding: 2,
                  height: "auto",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: index % 2 === 0 ? "#0F2D4D" : "#E0E0E0", // Light for dark background, dark for light background
                    }}
                  />
                }
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography
                  sx={{
                    fontSize: "2.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.word}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Display the status of the word */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                    marginRight: "5px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: "400",
                      color: index % 2 === 0 ? "#333" : "#E0E0E0",
                    }}
                  >
                    حالة البطاقة:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: "400",
                      marginLeft: "5px",
                      color: item.status === "مكتملة" ? "green" : "red",
                    }}
                  >
                    {item.status}
                  </Typography>
                  {selectedWord && (
                    <Box sx={{ marginLeft: "auto" }}>
                      <ButtonCompnent
                        text="املا البطاقة"
                        onclick={handleAddWord}
                      ></ButtonCompnent>
                    </Box>
                  )}
                </div>

                {item.meanings?.map((meaning, meaningIndex) => (
                  <div
                    key={meaningIndex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#1A4566",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* Meaning text */}
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: "300",
                        color: index % 2 === 0 ? "#555" : "#F0F0F0",
                      }}
                    >
                      {meaning}
                    </Typography>

                    {/* Chevron Up and Down buttons inside the box */}
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        onClick={() => moveMeaningUp(index, meaningIndex)}
                        disabled={meaningIndex === 0}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor:
                            meaningIndex === 0 ? "not-allowed" : "pointer",
                          color: index % 2 === 0 ? "#0F2D4D" : "#F0F0F0",
                        }}
                      >
                        <FontAwesomeIcon icon={faChevronUp} />
                      </button>
                      <button
                        onClick={() => moveMeaningDown(index, meaningIndex)}
                        disabled={meaningIndex === item.meanings.length - 1}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor:
                            meaningIndex === item.meanings.length - 1
                              ? "not-allowed"
                              : "pointer",
                          color: index % 2 === 0 ? "#0F2D4D" : "#F0F0F0",
                        }}
                      >
                        <FontAwesomeIcon icon={faChevronDown} />
                      </button>
                    </div>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

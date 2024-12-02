import { Button, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../components/Input/InputField";
import Voice from "../../components/Voice/Voice";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { useDispatch, useSelector } from "react-redux";
import { updateDiacritics } from "../../redux/userSlice";
import Swal from "sweetalert2";

const PhoneticKeyboard = ({ index, field, examples, setExamples }) => {
  const ipaCharacters = [
    "ʌ",
    "æ",
    "θ",
    "ð",
    "ʃ",
    "ʒ",
    "ŋ",
    "ʧ",
    "ʤ",
    "ɪ",
    "ɛ",
    "ɔ",
    "ʊ",
    "ʌ",
    "ɛ",
    "ɑ",
    "ɔ",
    "ɒ",
    "ʍ",
    "ɾ",
    "ɹ",
    "j",
    "w",
    "p",
    "b",
    "t",
    "d",
    "k",
    "g",
  ];
  const dispatch = useDispatch();

  // Inject character into focused input field
  const handleKeyPress = (char) => {
    const activeElement = document.activeElement; // Get the currently focused element
    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA")
    ) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;

      console.log("field = ", field);
      console.log("index = ", index);
      console.log("examples = ", examples);

      const newValue =
        activeElement.value.slice(0, start) +
        char +
        activeElement.value.slice(end);
      setExamples((prev) =>
        prev.map((example, i) =>
          i === index ? { ...example, [field]: newValue } : example
        )
      );
      console.log("examples = ", examples);
      dispatch(updateDiacritics(examples));

      activeElement.focus(); // Keep focus on the input
    }
  };

  return (
    <Grid2 container spacing={1} justifyContent="center" mt={2}>
      {ipaCharacters.map((char, index) => (
        <Grid2 item key={index}>
          <Button
            variant="outlined"
            sx={{ padding: "10px", fontSize: "18px", fontFamily: "El Messiri" }}
            onMouseDown={(e) => {
              e.preventDefault(); // Prevent focus loss
              handleKeyPress(char);
            }}
          >
            {char}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};

function DataInputs({
  data,
  onChange,
  addRecord,
  index,
  setRecorded,
  setIndex,
  setField,
}) {
  const { word_with_diacritics, phonetic_writing, pronounciation } = data;
  console.log(data);
  return (
    <Grid2
      container
      size={12}
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 5 }}
    >
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <InputField
          label="الضبط التام بالشكل "
          text={true}
          val={word_with_diacritics}
          set={(value) => onChange("word_with_diacritics", value)}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <InputField
          label="الكتابة الصوتية"
          text={true}
          val={phonetic_writing}
          set={(value) => onChange("phonetic_writing", value)}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
        <Voice
          setVoice={(value) => {
            console.log(value);
            onChange("pronounciation", value);
            setRecorded(true);
          }}
          addRecord={addRecord}
          index={index}
          initialURL={data.pronounciation}
        />
      </Grid2>
    </Grid2>
  );
}

export default function Section1({ word = "المدخل", addRecord }) {
  const [recorded, setRecorded] = useState(false);
  const examplesInfo = useSelector((state) => state.user.form.diacritics);
  const [examples, setExamples] = useState(
    useSelector((state) => state.user.form.diacritics) || [
      { word_with_diacritics: "", phonetic_writing: "", pronounciation: null },
    ]
  );
  if (examples?.length === 0)
    examples.push({
      word_with_diacritics: "",
      phonetic_writing: "",
      pronounciation: null,
    });
  useEffect(() => {
    setExamples(examplesInfo);
  }, [examplesInfo]);

  const dispatch = useDispatch();

  const handleChange = (index, field, value) => {
    setExamples((prev) =>
      prev.map((example, i) =>
        i === index ? { ...example, [field]: value } : example
      )
    );
  };
  useEffect(() => {
    dispatch(updateDiacritics(examples));
  }, [examples, dispatch]);

  const addExample = () => {
    if (examples[examples.length - 1].pronounciation) {
      setExamples((prev) => [
        ...prev,
        {
          word_with_diacritics: "",
          phonetic_writing: "",
          pronounciation: null,
        },
      ]);
      setRecorded(false);
    } else {
      Swal.fire({
        title: "يرجي التسجيل حتي تتمكن من اضافة مثال اخر ",
        confirmButtonText: "موافق",
      });
    }
  };

  return (
    <div id="section1">
      <Typography
        variant="h4"
        fontWeight={"bold"}
        fontFamily={"El Messiri"}
        color="#0F2D4D"
        mb={3}
      >
        مستويات التحرير:
      </Typography>
      <Grid2
        container
        mt={2}
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid2 size={{ xs: 8, sm: 4, md: 3 }}>
          <InputField label={word} text={true} disabled={true} />
        </Grid2>
        <Grid2 size={12}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            المعلومات الصوتية:
          </Typography>
        </Grid2>
        {examples?.map((example, index) => (
          <DataInputs
            key={index}
            data={example}
            onChange={(field, value) => handleChange(index, field, value)}
            addRecord={addRecord}
            index={index}
            setRecorded={setRecorded}
          />
        ))}
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ButtonCompnent
            text="اضف مثال جديد"
            icon={true}
            onclick={addExample}
          />
        </Grid2>
      </Grid2>
    </div>
  );
}

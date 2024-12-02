import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import Box from "@mui/material/Box";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import { useEffect, useState } from "react";
import { Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import MyFormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {
  clearCollocates,
  clearCollocates_Obj,
  clearSemantic_info_obj,
  updateCollocates,
  updateCollocates_obj,
  updateSemantic_info,
  updateSemantic_info_obj,
} from "../../redux/userSlice";
import Swal from "sweetalert2";
function Example({ data, onChange }) {
  const { text, source } = data;

  return (
    <Grid container spacing={2} size={12} sx={{ my: "10px" }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <InputField
          text={true}
          label="أمثلة إستعمالية"
          val={text}
          set={(value) => onChange("text", value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <InputField
          text={true}
          label="المصدر"
          val={source}
          set={(value) => {
            onChange("source", value);
          }}
        />
      </Grid>
    </Grid>
  );
}

function Section4({
  data,
  setValue,
  setValue2,
  arrCollocates,
  setArrCollocates,
  index,
  collocatesIndex,
}) {
  const [collocate_text, setCollocate_text] = useState(data?.collocate_text);
  const [meaning, Setmeaning] = useState(data?.meaning);
  const [example, setExamples] = useState(
    data?.example || [{ text: "", source: "" }]
  );
  const complet = useSelector(
    (state) => state.user.semantic_info_obj.completed
  );
  const [completed, setCompleted] = useState(complet || false);
  const collocates_obj = useSelector((state) => state.user.collocates_obj);
  const meaning_obj = useSelector((state) => state.user.meaning);
  const dispatch = useDispatch();
  const handleNewSemantic = () => {
    if (meaning_obj?.text) {
      if (collocates_obj.collocate_text !== undefined) {
        if (collocatesIndex || collocatesIndex === 0) {
          dispatch(
            updateCollocates({ arr: null, collocatesIndex: collocatesIndex })
          );
        } else {
          dispatch(updateCollocates({ arr: null, collocatesIndex: null }));
        }
        dispatch(updateSemantic_info_obj({ name: "collocates", value: null }));
      }
      dispatch(
        updateSemantic_info_obj({ name: "meaning", value: meaning_obj })
      );
      dispatch(
        updateSemantic_info_obj({ name: "completed", value: completed })
      );
      if (index !== undefined) {
        // dispatch(updateSemanticInfoObj({ name: "collocates", value: null }));

        dispatch(updateSemantic_info({ index: index }));
      } else {
        dispatch(updateSemantic_info({ index: null }));
      }
      dispatch(clearSemantic_info_obj());
      dispatch(clearCollocates());
      setValue(-1);
      setValue2(-1);
    } else {
      Swal.fire({
        title: "يرجي كتابة المعنى الدلالي ",
        confirmButtonText: "موافق", // Change the button text here
      });
    }
  };
  const handleChange = (index, field, value) => {
    setExamples((prev) =>
      prev.map((example, i) =>
        i === index ? { ...example, [field]: value } : example
      )
    );
    dispatch(updateCollocates_obj({ name: "example", value: example }));
  };
  const handleAddNewCollocates = () => {
    if (collocate_text !== undefined) {
      if (collocatesIndex || collocatesIndex === 0) {
        dispatch(
          updateCollocates({ arr: null, collocatesIndex: collocatesIndex })
        );
      } else {
        dispatch(updateCollocates({ arr: null, collocatesIndex: null }));
      }
      if (!arrCollocates) {
        setArrCollocates([collocates_obj]);
      } else {
        setArrCollocates([...arrCollocates, collocates_obj]);
      }
      dispatch(clearCollocates_Obj());
      setCollocate_text("");
      Setmeaning("");
      setExamples([{}]);
      setValue2(-1);
    } else {
      Swal.fire({
        title: "يرجى كتابة تركيب تصاحبي",
        confirmButtonText: "موافق", // Change the button text here
      });
    }
  };
  const addExample = () => {
    setExamples((prev) => [...prev, { text: "", source: "" }]);
  };
  useEffect(() => {
    dispatch(
      updateCollocates_obj({
        name: "collocate_text",
        value: data?.collocate_text,
      })
    );
    dispatch(updateCollocates_obj({ name: "example", value: data?.example }));
    dispatch(updateCollocates_obj({ name: "meaning", value: data?.meaning }));
  }, [data, dispatch]);
  return (
    <div id="section4">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid2 size={12}>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontFamily={"El Messiri"}
              color="#0F2D4D"
            >
              المتصاحبات اللفظية:
            </Typography>
          </Grid2>
          <Grid size={{ xs: 12, md: 3 }}>
            <InputField
              text={true}
              label="التركيب التصاحبي"
              name={"collocate_text"}
              collocates_obj={true}
              val={collocate_text}
              set={setCollocate_text}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <InputField
              text={true}
              label="معني التركيب التصاحبي"
              name={"meaning"}
              collocates_obj={true}
              val={meaning}
              set={Setmeaning}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{
              margin: "auto",
            }}
          >
            <ButtonCompnent
              text={
                collocatesIndex >= 0 ? "حفظ التغييرات" : "أضف متصاحبة جديدة"
              }
              rounded={true}
              icon={true}
              onclick={handleAddNewCollocates}
            ></ButtonCompnent>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            size={12}
            sx={{
              margin: "auto",
            }}
          >
            {example.map((data, index) => (
              <Example
                key={index}
                data={data}
                onChange={(field, value) => {
                  handleChange(index, field, value);
                }}
              />
            ))}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div style={{ width: "100%" }} onClick={addExample}>
              {" "}
              <ButtonCompnent
                text="أضف مثال آخر"
                rounded={true}
                icon={true}
              ></ButtonCompnent>
            </div>
          </Grid>
          <Grid
            container
            size={12}
            sx={{
              mt: 10,
              justifyContent: "start",
            }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 1 }}>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                fontFamily={"El Messiri"}
                color="#0F2D4D"
              >
                مواقع للبحث:
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <a
                href="https://falak.ksaa.gov.sa/"
                target="_blank"
                rel="noreferrer"
              >
                <ButtonCompnent text="فلك" />
              </a>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <a
                href="https://www.sketchengine.eu/"
                target="_blank"
                rel="noreferrer"
              >
                <ButtonCompnent text="Sketch" />
              </a>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <a href="https://chat.com/" target="_blank" rel="noreferrer">
                <ButtonCompnent text="AI" />
              </a>
            </Grid>
            <Grid2 size={12} mt={10}>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                fontFamily={"El Messiri"}
                color="#0F2D4D"
              >
                حالة البطاقة:
              </Typography>
            </Grid2>
            <Grid2 size={12} ml={2}>
              <RadioGroup
                name="use-radio-group"
                defaultValue="first"
                value={completed ? "second" : "first"}
                sx={{ width: "fit-content", direction: "rtl", marginTop: 0 }}
                onChange={(e) => {
                  if (e.target.value === "first") {
                    setCompleted(false);
                  } else {
                    setCompleted(true);
                  }
                }}
              >
                <MyFormControlLabel
                  value="first"
                  label="ناقص"
                  control={<Radio />}
                />
                <MyFormControlLabel
                  value="second"
                  label="مكتمل"
                  control={<Radio />}
                />
              </RadioGroup>
            </Grid2>
            <Grid container justifyContent={"center"} size={12} mt={5}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <ButtonCompnent
                  text={
                    index >= 0 ? "حفظ التغييرات" : "اضف معلومة دلالية جديدة"
                  }
                  icon={true}
                  onclick={handleNewSemantic}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Section4;

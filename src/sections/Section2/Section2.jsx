import Grid from "@mui/material/Grid2";
import InputField from "../../components/Input/InputField";
import { Divider, Grid2, Typography } from "@mui/material";
import DividerComponent from "../../components/Divider/DividerComponent";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Section2() {
  const dispatch = useDispatch();
  const morphologicalInfo = useSelector(
    (state) => state.user.form?.morphological_info
  );
  const [form_morphological_info, setForm_morphological_info] = useState(
    morphologicalInfo || {}
  );
  useEffect(() => {
    setForm_morphological_info(morphologicalInfo);
    setTex(morphologicalInfo?.root);
  }, [morphologicalInfo]);

  const [tex, setTex] = useState(form_morphological_info?.root);
  return (
    <div id="section2">
      <Grid
        container
        rowSpacing={5}
        columnGap={5}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid2 size={12}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            fontFamily={"El Messiri"}
            color="#0F2D4D"
          >
            المعلومات الصرفية:
          </Typography>
        </Grid2>
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          <InputField
            label={"الاصل اللغوي"}
            text={true}
            name={"root"}
            val={tex}
            set={setTex}
            MorphologicalInfo={true}
          ></InputField>
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          {" "}
          <InputField
            label={"الفئة الكلامية"}
            select={true}
            name={"word_class"}
            MorphologicalInfo={true}
            val={form_morphological_info?.word_class}
            defaultOption={form_morphological_info?.word_class}
            options={["مشتق", "مصدر", "علم", "ظرف"]}
          ></InputField>
        </Grid> */}
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          {" "}
          <InputField
            label={"الصيغة الصرفية"}
            select={true}
            name={"morphological_form"}
            MorphologicalInfo={true}
            options={[
              "اسم فاعل",
              "اسم مفعول",
              "صيغة مبالغة",
              "مصدر ميمي",
              "مصدر صناعي",
              "نسبة",
              "اسم مكان",
              "اسم زمان",
              "اسم آلة",
              "صفة مشبهة",
              "اسم همزة",
              "اسم هيئة",
              "اسم تفضيل",
            ]}
            defaultOption={form_morphological_info?.morphological_form}
          ></InputField>
        </Grid>
        <Grid size={{ xs: 12, sm: 5, md: 4, lg: 3 }}>
          {" "}
          <InputField
            label={"المستوى اللغوي"}
            select={true}
            name={"linguistic_level"}
            MorphologicalInfo={true}
            options={["تراثي", "معاصر", "دخيل", "معرَّب"]}
            defaultOption={form_morphological_info?.linguistic_level}
          ></InputField>
        </Grid>
      </Grid>
    </div>
  );
}

export default Section2;

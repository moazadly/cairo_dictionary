import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import Section1 from "../../sections/Section1";
import DividerComponent from "../../components/Divider/DividerComponent";
import Section2 from "../../sections/Section2/Section2";
import Section3 from "../../sections/Section3";
import LastSection from "../../sections/LastSection/LastSection";
import BigSection from "../../sections/BigSection/BigSection";
import TabSection from "../../sections/TabSection/TabSection";
import { useDispatch, useSelector } from "react-redux";
import Section2InVerb from "../../sections/Section2InVerb/Section2InVerb";
import LoadingPage from "../LoadingPage/LoadingPage";
import Swal from "sweetalert2";
import { clearSavedState } from "../../redux/userSlice";

export default function VervPage(props) {
  const [value, setValue] = useState(-1);
  const [value2, setValue2] = useState(-1);
  const [files, setFiles] = useState([]);
  const [records, setRecords] = useState([]);
  const isLoading = useSelector((state) => state.user.pageLoading);
  const saveDone = useSelector((state) => state.user.saved);
  const dispatch = useDispatch();
  useEffect(() => {
    if (saveDone) {
      Swal.fire({
        title: "تم الحفظ بنجاح!",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    }
    dispatch(clearSavedState({}));
  }, [saveDone]);
  const addFile = (file, index) => {
    console.log(index);
    if (index !== undefined && index < files.length) {
      const updatedFiles = [...files];
      if (file.image) {
        updatedFiles[index].image = file.image;
      } else {
        updatedFiles[index].image = file;
      }
      setFiles(updatedFiles);
    } else {
      setFiles([...files, { image: file, index: files.length }]);
    }
  };

  const addRecord = (record, index) => {
    if (index !== undefined && index < records.length) {
      const updatedRecords = [...records];
      updatedRecords[index] = record;
      setRecords(updatedRecords);
    } else {
      setRecords([...records, record]);
    }
  };

  useEffect(() => {
    console.log("files: ", files);
    console.log("records: ", records);
  }, [files, records]);

  const semantic_info = useSelector((state) => state.user.semantic_info);
  const [semantic_info_arr, setSemantic_info_arr] = useState(
    semantic_info || {}
  );
  useEffect(() => {
    setSemantic_info_arr(semantic_info);
  }, [semantic_info]);
  return (
    <Grid2 container>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <Grid2 mx={4} my={3} width={"100%"}>
          <Section1 word={props.word} addRecord={addRecord} />
          <div className="no-print">
            <DividerComponent />
          </div>
          <Section2InVerb />
          <div className="no-print">
            <DividerComponent />
          </div>
          {semantic_info_arr?.length > 0 ? (
            value === -1 ? (
              <>
                {console.log(semantic_info_arr)}
                <BigSection
                  arr={semantic_info_arr}
                  value={value}
                  setValue={setValue}
                  value2={value2}
                  setValue2={setValue2}
                  addFile={addFile}
                />
                <div style={{ padding: 24 }}>
                  {" "}
                  <Section3 addFile={addFile} />
                  <TabSection
                    value={value2}
                    setValue={setValue2}
                    setValue2={setValue}
                  />
                </div>
              </>
            ) : (
              <BigSection
                arr={semantic_info_arr}
                value={value}
                setValue={setValue}
                addFile={addFile}
                value2={value2}
                setValue2={setValue2}
              />
            )
          ) : (
            <>
              <Section3 addFile={addFile} />
              <TabSection
                value={value2}
                value1={value}
                setValue={setValue2}
                setValue2={setValue}
              />
            </>
          )}
          <div className="no-print">
            {" "}
            <DividerComponent />
          </div>
          <LastSection
            files={files}
            records={records}
            verb={true}
            value={value}
            value2={value2}
          />
        </Grid2>
      )}
    </Grid2>
  );
}

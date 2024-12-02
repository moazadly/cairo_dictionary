import { createTheme, Grid2, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AccordionWithWords from "./pages/FirstPage/FirstPage";
import NounsPage from "./pages/NounsPage/NounsPage";
import VerbPage from "./pages/VerbPage/VerbPage";
// import { getWord } from "./redux/userSlice";

function App() {
  const [value, setValue] = useState(-1);
  const [value2, setValue2] = useState(-1);
  const [files, setFiles] = useState([]);
  const [records, setRecords] = useState([]);

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

  const auth = useSelector((state) => state.user.auth);
  const semantic_info = useSelector((state) => state.user.semantic_info);
  const [semantic_info_arr, setSemantic_info_arr] = useState(
    semantic_info || {}
  );
  useEffect(() => {
    setSemantic_info_arr(semantic_info);
  }, [semantic_info]);
  const [word, setWord] = useState("المدخل");
  const theme = createTheme({
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* {auth && ( */}
            <Route
              path="/firstPage"
              element={
                <>
                  {" "}
                  <Navbar first={true}></Navbar>
                  <AccordionWithWords />
                </>
              }
            />
            <>
              <Route
                path="/nounpage"
                element={
                  <>
                    <Navbar
                      navItems={[
                        { text: " المعلومات الصوتيه", id: "section1" },
                        { text: "المعلومات الصرفيه", id: "section2" },
                        { text: " المعلومات الدلاليه", id: "section3" },
                        { text: "المتصاحبات اللفظية", id: "section4" },
                      ]}
                      setWord={setWord}
                      word={word}
                    ></Navbar>
                    <NounsPage word={word} />
                  </>
                }
              />
            </>
            <Route
              path="/verbpage"
              element={
                <>
                  <Navbar
                    navItems={[
                      { text: " المعلومات الصوتيه", id: "section1" },
                      { text: "المعلومات الصرفيه", id: "section2" },
                      { text: " المعلومات الدلاليه", id: "section3" },
                      { text: "المتصاحبات اللفظية", id: "section4" },
                    ]}
                    setWord={setWord}
                    word={word}
                  ></Navbar>
                  <VerbPage word={word} />
                </>
              }
            />
            {/* )} */}

            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

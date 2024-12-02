import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  data: JSON.parse(localStorage.getItem("data")) || null,
  loading: false,
  pageLoading: false,
  message: "",
  auth: localStorage.getItem("authToken") || false,
  form: JSON.parse(localStorage.getItem("form")) || {},
  wordData: localStorage.getItem("wordData") || [],
  diacritics: [],
  morphological_info: {},
  semantic_info: [],
  semantic_info_obj: {},
  collocates: [],
  collocates_obj: {},
  meaning: {},
  image_obj: {},
  verbs: [],
  nouns: [],
  assigned_functional_words: [],
  saved: false,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ code, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Auth/login",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.status !== 200 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const assignedWords = createAsyncThunk(
  "user/assignedWords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Word",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return { data };
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);
export const assignedVerbs = createAsyncThunk(
  "user/assignedVerbs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://arabic-data-collector.onrender.com/api/v1/Verb",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return { data };
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);
export const getWord = createAsyncThunk(
  "user/getWord",
  async ({ wordId }, { rejectWithValue }) => {
    try {
      console.log(wordId);
      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Word/${wordId}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.status !== 200 || !response.ok) {
        return rejectWithValue(data);
      } else {
        return { data };
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getVerb = createAsyncThunk(
  "user/getVerb",
  async ({ wordId }, { rejectWithValue }) => {
    try {
      console.log(wordId);
      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Verb/${wordId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return { data };
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const fetchDataWithState = createAsyncThunk(
  "user/fetchDataWithState",
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log("helllllllllllllo in fetch");
      const { user } = getState();
      console.log(user.form);
      const payload = { ...user.form };
      const id = payload._id;
      console.log(payload);
      delete payload._id;

      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Word/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message: "error here" });
    }
  }
);
export const fetchDataWithStateVirb = createAsyncThunk(
  "user/fetchDataWithStateVirb",
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log("helllllllllllllo in fetch");
      const { user } = getState();
      console.log(user.form);
      const payload = { ...user.form };
      const id = payload._id;
      console.log(payload);
      delete payload._id;

      const response = await fetch(
        `https://arabic-data-collector.onrender.com/api/v1/Verb/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message: "error here" });
    }
  }
);

// Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("---------from logged out--------------");
      state.token = null;
      state.error = false;
      state.data = null;
      state.auth = false;
      state.loading = false;
      state.message = "";
      localStorage.clear();
    },
    updateForm: (state, action) => {
      state.form[action.payload.name] = action.payload.value;
    },
    updateDiacritics: (state, action) => {
      console.log(action.payload);
      state.diacritics = action.payload;
    },
    updateMorphologicalInfo: (state, action) => {
      state.morphological_info[action.payload.name] = action.payload.value;
    },
    updateCollocates_obj: (state, action) => {
      state.collocates_obj[action.payload.name] = action.payload.value;
    },
    updateSemantic_info_obj: (state, action) => {
      if (action.payload.name === "collocates") {
        state.semantic_info_obj[action.payload.name] = state.collocates;
      } else {
        state.semantic_info_obj[action.payload.name] = action.payload.value;
      }
    },
    clearSemantic_info_obj: (state) => {
      state.semantic_info_obj = {};
    },
    updateMeaning: (state, action) => {
      if (action.payload.arr !== null) {
        state.meaning = action.payload.arr;
      } else {
        state.meaning[action.payload.name] = action.payload.value;
      }
    },
    updateImage_obj: (state, action) => {
      state.image_obj[action.payload.name] = action.payload.value;
      updateMeaning({ name: "image", value: state.image_obj });
    },
    updateSemantic_info: (state, action) => {
      if (action.payload.index !== null) {
        state.semantic_info[action.payload.index] = state.semantic_info_obj;
      } else {
        state.semantic_info = [...state.semantic_info, state.semantic_info_obj];
      }
    },
    updateCollocates: (state, action) => {
      if (action.payload.collocatesIndex !== null) {
        state.collocates[action.payload.collocatesIndex] = state.collocates_obj;
      } else {
        if (action.payload.arr) {
          state.collocates = action.payload.arr;
        } else {
          state.collocates = [...state.collocates, state.collocates_obj];
        }
      }
    },
    clearCollocates: (state) => {
      state.collocates = [];
    },
    clearCollocates_Obj: (state) => {
      state.collocates_obj = {};
    },
    clearForm: (state) => {
      state.form = {};
    },
    clearSemantic_info: (state) => {
      state.semantic_info = [];
    },
    clearSavedState: (state) => {
      state.saved = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.loading = false;
        state.auth = true;
        state.data = data;
        let wordData = [];
        const words = data.assigned_words.map((item) => ({
          word: item.text,
          status: item.state,
          meanings: item.semantic_info.map((info) => info.meaning.text),
        }));
        const verbs = data.assigned_verbs.map((item) => ({
          word: item.text,
          status: item.state,
          meanings: item.semantic_info.map((info) => info.meaning.text),
        }));
        const assigned_functional_words = data.assigned_functional_words.map(
          (item) => ({
            word: item.text,
            status: item.state,
          })
        );
        state.assigned_functional_words = data.assigned_functional_words.map(
          (item) => item.text
        );
        state.nouns = data.assigned_words.map((item) => item.text);
        state.verbs = data.assigned_verbs.map((item) => item.text);

        wordData = [...words, ...assigned_functional_words, ...verbs];
        state.wordData = wordData;

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("wordData", JSON.stringify(wordData));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });

    builder
      .addCase(assignedWords.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(assignedWords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })
      .addCase(assignedWords.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(assignedVerbs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(assignedVerbs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        localStorage.setItem("data", JSON.stringify(action.payload.data));
      })
      .addCase(assignedVerbs.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });

    builder
      .addCase(getWord.pending, (state) => {
        state.pageLoading = true;
        state.error = false;
      })
      .addCase(getWord.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.pageLoading = false;
        state.form = data;
        state.semantic_info = data.semantic_info;
        state.morphological_info = data.morphological_info;
        state.diacritics = data.diacritics;
        console.log(state.diacritics);
        localStorage.setItem("form", JSON.stringify(data));
      })
      .addCase(getWord.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(getVerb.pending, (state) => {
        state.pageLoading = true;
        state.error = false;
      })
      .addCase(getVerb.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.pageLoading = false;
        state.form = data;
        state.semantic_info = data.semantic_info;
        state.morphological_info = data.morphological_info;
        state.diacritics = data.diacritics;
        localStorage.setItem("form", JSON.stringify(data));
      })
      .addCase(getVerb.rejected, (state, action) => {
        state.pageLoading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(fetchDataWithState.pending, (state) => {
        console.log("in pending state");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataWithState.fulfilled, (state, action) => {
        console.log("in fulfilled state");
        state.loading = false;
        state.saved = true;

        console.log(action.payload);
        // console.log(action.payload.data);
        // state.loading = false;
        // state.form = action.payload.data.data;
        // state.semantic_info = state.form.semantic_info;
        // state.morphological_info = state.form.morphological_info;
        // state.diacritics = state.form.diacritics;
        // localStorage.setItem("form", JSON.stringify(action.payload.data.data));
      })
      .addCase(fetchDataWithState.rejected, (state, action) => {
        console.log("in rejected state");
        console.log(action);
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(fetchDataWithStateVirb.pending, (state) => {
        console.log("in pending state");
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDataWithStateVirb.fulfilled, (state, action) => {
        console.log("in fulfilled state");
        state.loading = false;
        state.saved = true;
        console.log(action.payload);
      })
      .addCase(fetchDataWithStateVirb.rejected, (state, action) => {
        console.log("in rejected state");
        console.log(action);
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  login,
  updateForm,
  updateMorphologicalInfo,
  updateDiacritics,
  updateDiacriticswithRecord,
  updateCollocates_obj,
  updateSemantic_info_obj,
  updateSemantic_infowithImage,
  clearSemantic_info_obj,
  updateSemantic_info,
  updateMeaning,
  updateImage_obj,
  updateCollocates,
  clearCollocates,
  clearCollocates_Obj,
  clearForm,
  clearSemanticInfo,
  clearSavedState,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateGameData: GameDataState = {
  gameData: [
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ],
  isActiveGame: false,
  sing: "null",
  activeSing: null,
  isReset: false,
  isGameOver: false,
};

export type DataItem = string;

export interface GameDataState {
  gameData: DataItem[];
  sing: "one" | "null" | "empty";
  isActiveGame: boolean;
  activeSing: "one" | "null" | null;
  isReset: boolean;
  isGameOver: boolean;
}

type FetchDataPayload = string[];

// Асинхронная функция для отправки запроса и получения данных
export const updateData = createAsyncThunk<FetchDataPayload>(
  "gameData/fetchData",
  async (_, { getState }) => {
    const currentState = getState() as { gameData: GameDataState }; // Get the current state
    const response = await axios.post<string[]>(
      "https://game.goaltime.com.ua/update",
      {
        gameData: currentState.gameData.gameData,
        isActiveGame: currentState.gameData.isActiveGame,
        activeSing: currentState.gameData.activeSing,
        isReset: currentState.gameData.isReset,
        // isGameOver: currentState.gameData.isGameOver,
      }
    );
    return response.data;
  }
);

// Асинхронная функция для получения данных из /data
export const getData = createAsyncThunk<FetchDataPayload>(
  "gameData/fetchGameData",
  async () => {
    const response = await axios.get<string[]>("https://game.goaltime.com.ua/data");
    return response.data;
  }
);

export const gameDataSlice = createSlice({
  name: "gameData",
  initialState: initialStateGameData,
  reducers: {
    addSing(state, action) {
      state.gameData[action.payload.index] = state.sing;
    },
    resetGame(state, action) {
      state.gameData = initialStateGameData.gameData;
    },
    isActiveGame(state, action) {
      state.isActiveGame = action.payload;
    },
    setSing(state, action) {
      state.sing = action.payload;
    },
    setActiveSing(state, action) {
      state.activeSing = action.payload;
    },
    setIsReset(state, action) {
      state.isReset = action.payload;
    },
    setIsGameOver(state, action) {
      state.isGameOver = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(updateData.fulfilled, (state, action: any) => {
      state.gameData = action.payload.gameData;
      state.isActiveGame = action.payload.isActiveGame;
      state.activeSing = action.payload.activeSing;
      state.isReset = action.payload.isReset;
      if (action.payload.isReset) {
        state.sing = "null";
        state.isActiveGame = false;
      }
      // if (action.payload.isGameOver) {
      //   state.isGameOver = true;

      // }
    });
    builder.addCase(getData.fulfilled, (state, action: any) => {
      state.gameData = action.payload.gameData;
      state.isActiveGame = action.payload.isActiveGame;
      state.activeSing = action.payload.activeSing;
      state.isReset = action.payload.isReset;
      if (action.payload.isReset) {
        state.sing = "null";
        state.isActiveGame = false;
      }
      // if (action.payload.isGameOver) {
      //   state.isGameOver = true;
      //   state.isActiveGame = false;
      // }
    });
  },
});

export const {
  addSing,
  resetGame,
  isActiveGame,
  setSing,
  setActiveSing,
  setIsReset,
  setIsGameOver
} = gameDataSlice.actions;
export default gameDataSlice.reducer;

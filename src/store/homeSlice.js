import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        home_data: {},
        genres: {},
        config: {}
    },
    reducers: {
        getAPIConfiguration: (state, action) => {
            state.config = action.payload;
        },
        getHomeData: (state, action) => {
            state.home_data = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        }
    },
});

//Actions exported...
export const { getAPIConfiguration, getGenres, getHomeData } = homeSlice.actions;

//Exporting reducers to provide it in store...
export default homeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import newsStoriesService from "../services/stories";

const storiesSlice = createSlice({
    name: "stories",
    initialState: {
        storiesList: [],
        storyData: [],
        isLoadingStories: true,
        isLoadingData: true, 
        error: null,
    },
    reducers: {
        storiesRequested: (state, action) => {
            state.isLoadingStories = action.payload
        },
        stroiesReceved: (state, action) => {
            state.storiesList = [...state.storiesList, action.payload]
        },
        storiesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoadingStories = false
        },
        storyDataRequested: (state, action) => {
            state.isLoadingData = action.payload
        },
        storyDataReceved: (state, action) => {
            state.storyData = action.payload
        },
        commentsReceved: (state, action) => {
            state.comments = [...state.comments, action.payload]
        },
        clearStories: (state) => {
            state.storiesList = []
        }
    }
})

const { reducer:storiesReducer, actions } = storiesSlice;
const {
    storiesRequested,
    stroiesReceved,
    storyDataRequested,
    storyDataReceved,
    storiesRequestFailed,
    clearStories,
} = actions

// Fetch stroies list
export const fetchStoriesList = () => async (dispatch) => {
        dispatch(storiesRequested(true))
        dispatch(clearStories())
        try {
            const { content } = await newsStoriesService.getIds();
            const stories = content.slice(0,100)
            await stories.map(i => dispatch(fetchStoriesData(i)))
        } catch (error) {
            dispatch(storiesRequestFailed(error.message))
        }
}
// Fetch stories data
const fetchStoriesData = (id) => async (dispatch) => {
    try {
        const { content } = await newsStoriesService.getStory(id);
        dispatch(stroiesReceved(content))
        dispatch(storiesRequested(false))
    } catch (error) {
        dispatch(storiesRequestFailed(error.message))
    }
}


// Fetch story
export const fetchStoryData = (id) => async (dispatch, state) => {
    dispatch(storyDataRequested(true))
    try {
        const { content } = await newsStoriesService.getStory(id);
        dispatch(storyDataReceved(content))
        dispatch(storyDataRequested(false))
    } catch (error) {
        dispatch(storiesRequestFailed(error.message))
    }
}


export const getStories = () => (state) => state.stories.storiesList
export const getLoadingStatus = () => (state) => state.stories.isLoadingStories 

export const getStoryData = () => (state) => state.stories.storyData
export const getLoadingDataStatus = () => (state) => state.stories.isLoadingData 


export default storiesReducer;
import httpService from "./http.service";

const newStoriesEndPoint = "newstories";
const storyEndPoint = "item/"

const newsStoriesService = {
    getIds: async () => {
        const { data } = await httpService.get(newStoriesEndPoint);
        return data
    },
    getStory: async (id) => {
        const { data } = await httpService.get(storyEndPoint+id);
        return data
    }
};

export default newsStoriesService;

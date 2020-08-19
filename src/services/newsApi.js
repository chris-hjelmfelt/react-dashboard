import Axios from 'axios';
import {selectFields} from './selectFields';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const newStoriesUrl = `${baseUrl}newstories.json?print=pretty&orderBy="$key"&limitToFirst=5`;
export const storyUrl = `${baseUrl}item/`;

export const getStory = async (storyId) => {
  const result = await Axios.get(`${storyUrl + storyId}.json`).then(({data}) => data && selectFields(data));
  return result;
}

export const getStoryIds = async() => {
  const result = await Axios.get(newStoriesUrl).then(({data}) => data);
  return result;
}
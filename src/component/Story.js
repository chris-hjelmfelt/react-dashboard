import React, {useState, useEffect} from 'react';
import {getStory} from '../services/newsApi';


export default function Story({storyId}) {
  const[story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
    // eslint-disable-next-line
  }, []);

  return story && story.url ? (
    <>
      <p><a href={story.url}>{story.title}</a><br />
      By: {story.by} <br />
      Posted: {story.time}</p>
      </>
  ) : null;
}

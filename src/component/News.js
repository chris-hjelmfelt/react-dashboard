import React, {useEffect, useState} from 'react';
import {getStoryIds} from '../services/newsApi';
import Story from './Story';

export default function NewsModule() {
  const [storyIds, setStoryIds] = useState([]); // initialize storyIds to an empty array

  useEffect(() => {  
    getStoryIds().then(data => setStoryIds(data));  // resolve the promise from getStoryIds
  }, []);

  return (
    <div className="module-div">
    <h2>News</h2>
    {storyIds.map(storyId => <Story key={storyId} storyId={storyId} />)}
    </div>
  );
}



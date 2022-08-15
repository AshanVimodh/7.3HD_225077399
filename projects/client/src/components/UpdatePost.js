import React from 'react';
import CreatePost from './CreatePost';

const UpdatePost = (props)=><CreatePost {...props} editMode={true} />;

export default UpdatePost;
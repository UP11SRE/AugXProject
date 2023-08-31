// ImageActions.js
import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';


const ImageActions = ({ image, onUpdateTitle, onDeleteImage }) => {
  const handleDeleteImage = debounce(async () => {
    try {
      const response = await axios.delete(`http://localhost:5600/api/images/${image.id}`);
      if (response.status === 200) {
        console.log('Image deleted successfully');
        onDeleteImage(image.id);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  },1000);

  return (
    <div className="image-actions">
      <button onClick={onUpdateTitle}>Edit Title</button>
      <button onClick={handleDeleteImage}>Delete Image</button>
    </div>
  );
};

export default ImageActions;

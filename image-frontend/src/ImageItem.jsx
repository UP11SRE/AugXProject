// ImageItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import ImageActions from './ImageAction';


const ImageItem = ({ image , dataList, setDataList}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(image.title || '');
  const [isFavorite, setIsFavorite] = useState(image.favorite || false); // Add favorite state


  const handleSaveTitle = debounce(async () => {
    try {
      const response = await axios.put(`http://localhost:5600/api/images/${image.id}`, { title });
      if (response.data) {
        console.log('Title updated successfully:', response.data);
        setIsEditing(false);

        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating title:', error);
    }
  },1000);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  
    // Update favorite status in dataList
    const updatedDataList = dataList.map(item =>
      item._id === image._id ? { ...item, favorite: !isFavorite } : item
    );
    setDataList(updatedDataList);
  
    // Store favorite status in LocalStorage
    const favoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    localStorage.setItem('favoriteStatus', JSON.stringify({ ...favoriteStatus, [image._id]: !isFavorite }));
  };
  
  // Inside useEffect to initialize favorite status from LocalStorage
  useEffect(() => {
    const favoriteStatus = JSON.parse(localStorage.getItem('favoriteStatus')) || {};
    setIsFavorite(favoriteStatus[image._id] || false);
  }, []);


  const handleDeleteImage = async () => {
    try {
      const response = await axios.delete(`http://localhost:5600/api/images/${image._id}`);
      if (response.status === 200) {
        console.log('Image deleted successfully');
        setDataList(dataList.filter(item => item._id !== image._id));
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="image-item">
      <img src={image.download_url} alt={image?.title} className="image-thumbnail" />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <button onClick={handleSaveTitle}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p className="image-title">{image?.title}</p>
          <ImageActions
            image={image}
            onUpdateTitle={() => setIsEditing(true)}
            onDeleteImage={handleDeleteImage}
          />
          <button onClick={handleToggleFavorite}>
            {isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
          </button>
        
        </div>
      )}
    </div>
  );
};

export default ImageItem;

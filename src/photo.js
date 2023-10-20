import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const CityImage = ({ cityName }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const accessKey = 'LvZcZ-xGpn0X_YJxkwmjazBfqbE9cVy-_ibjHBSxs48';
    const apiUrl = `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${accessKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const firstResult = data.results[0];
          setImageSrc(firstResult.urls.regular);
        }
      })
      .catch((error) => console.error('Error fetching image data: ', error));
  }, [cityName]);

  if (!imageSrc){
    return null
  }

  return (
       <img style={{ height:'100%',width: '100%',borderRadius:'30px',padding:'10px'}} src={imageSrc} alt={`${cityName}`} />
  );
};

export default CityImage;

import { createContext, useContext, useState } from 'react';

const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const addImage = (image) => {
    setImages((prev) => [...prev, image].slice(-3));
  };

  const getImages = () => {
    return images;
  };

  const clearImages = () => setImages([]);

  const getNumberOfImages = () => {
    return images.length;
  };

  const _setId = (_id) => setId(_id);
  const _getId = () => { return id; }

  const _setLoading = (_loading) => setLoading(_loading);
  const _getLoading = () => {return loading;}


  const removeImage = (index) => {
    if(index < 0)
      throw new Error("The index must be positive");
    let new_img = [];
    for(let i=0; i<images.length; i++)
      if(i != index) new_img.push(images[i]);
    setImages(new_img);
  };

  return (
    <EnrollmentContext.Provider value={{ images, addImage, clearImages, getImages,
    getNumberOfImages, removeImage, _setId, _getId, _setLoading,  _getLoading}}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollmentContext = () => useContext(EnrollmentContext);
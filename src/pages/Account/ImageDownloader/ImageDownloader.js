import React, { useState } from "react";
import { uploadAvatar, uploadPostImage } from "./../../../utils/helpers";

export const ImageDownloader = () => {
  const [imageValue, setImageValue] = useState(0)
  const [progress, setProgress] = useState(0);
  const LoadImage = (e) => {
    const file = e.target[0].files[0];
    uploadPostImage(file, imageValue, setImageValue, setProgress);
  };
  
  return (
    <form className="account__item" onSubmit={LoadImage}>
      <h1 className="account__subtitle">Аватарка:</h1>
      <input
        name="photo"
        type="file"
        className="account__input"
        accept=".png,.jpg,.jpeg"
        type="submit"
      />
    </form>
  );
};

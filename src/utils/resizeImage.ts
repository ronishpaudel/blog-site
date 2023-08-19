function resizeImage(inputImage, newWidth, newHeight, callback) {
  const img = new Image();

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx?.drawImage(img, 0, 0, newWidth, newHeight);

    const resizedDataURL = canvas.toDataURL("image/jpeg");

    if (callback) {
      callback(resizedDataURL);
    }
  };

  img.src = inputImage;
  return img.src;
}

export { resizeImage };

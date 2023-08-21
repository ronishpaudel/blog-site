function resizeImage2(imagePath: string, newWidth: number) {
  const originalImage = new Image();
  originalImage.src = imagePath;

  return new Promise((resolve) => {
    originalImage.addEventListener("load", function () {
      const originalWidth = originalImage.naturalWidth;
      const originalHeight = originalImage.naturalHeight;
      const aspectRatio = originalWidth / originalHeight;
      const newHeight = newWidth / aspectRatio;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx?.drawImage(originalImage, 0, 0, newWidth, newHeight);

      const resizedDataURL = canvas.toDataURL("image/jpeg", 0.9);
      resolve(resizedDataURL);
    });
  });
}

export { resizeImage2 };

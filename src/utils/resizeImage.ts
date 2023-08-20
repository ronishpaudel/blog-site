// function resizeImage(inputImage, newWidth, newHeight, callback) {
//   const img = new Image();

//   img.onload = function () {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     canvas.width = newWidth;
//     canvas.height = newHeight;

//     ctx?.drawImage(img, 0, 0, newWidth, newHeight);

//     const resizedDataURL = canvas.toDataURL("image/jpeg");

//     if (callback) {
//       callback(resizedDataURL);
//     }
//   };

//   img.src = inputImage;
//   return img.src;
// }

function resizeImage2(imagePath, newWidth) {
  const originalImage = new Image();
  originalImage.src = imagePath;
  const canvas = document.getElementById("canvas");
  const ctx = canvas?.getContext("2d");
  originalImage.addEventListener("load", function () {
    const originalWidth = originalImage.naturalWidth;
    const originalHeight = originalImage.naturalHeight;
    const aspectRatio = originalWidth / originalHeight;
    const newHeight = newWidth / aspectRatio;
    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
    // downloadImage(downloadName);
    console.log({
      hellsdo: document.getElementById("canvas").toDataURL("image/jpeg", 0.9),
    });
  });
}

export { resizeImage2 };

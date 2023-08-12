export const fileToBlob = async (file: any, fileType: string) => {
  const binary = atob(file.split(",")[1]);

  const array: any = [];
  for (let i = 0; i < binary.length; i++) {
    await array.push(binary.charCodeAt(i));
  }
  const blobData = new Blob([new Uint8Array(array)], {
    type: fileType,
  });
  return blobData;
};

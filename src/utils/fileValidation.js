export const allowedFileTypes = ["jpeg", "jpg", "png"];

export const validateFile = (file) => {
  if (file.size > 5242880) {
    alert("Please upload an image with size lesser than 5MB.");
    return false;
  }
  // not checking mime type here, but for better security that should be checked
  let regex = new RegExp(`^.*\.(${allowedFileTypes.join("|")})$`);
  if (!regex.test(file.name.toLowerCase())) {
    alert("Please upload a valid .jpeg, .jpg or .png image.");
    return false;
  }
  return true;
};

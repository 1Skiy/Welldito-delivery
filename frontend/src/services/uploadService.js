import { toast } from 'react-toastify';
import axios from 'axios';

export const uploadImage = async event => {
  let toastId = null;

  const image = await getImage(event);
  if (!image) return null;

  const formData = new FormData();
  formData.append('image', image, image.name);
  const response = await axios.post('api/upload', formData, {
    onUploadProgress: ({ progress }) => {
      if (toastId) toast.update(toastId, { progress });
      else toastId = toast.success('Actualizando...', { progress });
    },
  });
  toast.dismiss(toastId);
  return response.data.imageUrl;
};

const getImage = async event => {
  const files = event.target.files;

  if (!files || files.length <= 0) {
    toast.warning('No seleccionaste una imagen!', 'File Upload');
    return null;
  }

  const file = files[0];

  if (file.type !== 'image/jpeg') {
    toast.error('Solo JPG es admitido', 'File Type Error');
    return null;
  }

  return file;
};

import { useState } from 'react';
import { courseService } from '../../services/courseService';

export const useUploadModal = (onSuccess?: () => void) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [language, setLanguage] = useState('English');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [priceNotice, setPriceNotice] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePriceChange = (val: string) => {
    const num = Number(val);
    if (num > 0) {
      setPriceNotice('For now, share your course for free.');
      setPrice('0');
    } else {
      setPrice(val);
      setPriceNotice(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setAlertMessage('File size exceeds 10 MB limit. Please select a smaller file (max 10 MB).');
        setFile(null);
        e.target.value = '';
        return;
      }
      setAlertMessage(null);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!file) {
      setErrorMessage('Please select a file to upload');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setErrorMessage('Title and Description are required');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', '0'); // Strict free price 0 BDT
      formData.append('language', language);
      formData.append('tags', tags);
      formData.append('visibility', visibility);
      formData.append('document', file);

      const res = await courseService.createCourse(formData);
      setSuccessMessage(res.message || 'File uploaded and published successfully!');

      // Reset form
      setTitle('');
      setDescription('');
      setPrice('0');
      setFile(null);
      setTags('');
      setVisibility('public');

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    price,
    priceNotice,
    handlePriceChange,
    language,
    setLanguage,
    tags,
    setTags,
    visibility,
    setVisibility,
    file,
    setFile,
    handleFileChange,
    loading,
    alertMessage,
    setAlertMessage,
    successMessage,
    errorMessage,
    handleSubmit,
  };
};

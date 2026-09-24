export const triggerFileDownload = async (fileUrl: string, fileName: string = 'document') => {
  if (!fileUrl) {
    console.error('No file URL provided for download');
    return;
  }

  try {
    // Extract actual file extension from Cloudinary URL (e.g., .docx, .pdf, .pptx, .zip)
    const cleanUrl = fileUrl.split('?')[0];
    const lastDotIndex = cleanUrl.lastIndexOf('.');
    const urlExt = lastDotIndex !== -1 ? cleanUrl.substring(lastDotIndex) : '';

    // Strip any hardcoded extension from fileName to prevent duplicate/wrong extensions
    let baseName = fileName.replace(/\.[a-z0-9]+$/i, '').trim();
    if (!baseName) baseName = 'document';

    const safeFileName = urlExt ? `${baseName}${urlExt}` : `${baseName}.pdf`;

    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = safeFileName;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.warn('Blob fetch failed (likely CORS or network limit), falling back to direct opening', err);
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }
};

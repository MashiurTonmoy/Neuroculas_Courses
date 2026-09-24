import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useCreatePostPage } from './useCreatePostPage';
import { FormCardPaper } from './CreatePostPage.styles';
import { FileTypeIcon, getFileType, FILE_TYPE_CONFIG } from '../../components/FileTypeIcon/FileTypeIcon';
import { colors } from '../../theme/theme';

export const CreatePostPage: React.FC = () => {
  const {
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
    file,
    handleFileChange,
    loading,
    alertMessage,
    setAlertMessage,
    successMessage,
    errorMessage,
    handleSubmit,
    navigate,
  } = useCreatePostPage();

  const fileType = file ? getFileType(file.name) : null;
  const fileConfig = fileType ? FILE_TYPE_CONFIG[fileType] : null;

  return (
    <Box sx={{ bgcolor: 'transparent', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="md">
        <Button
          variant="contained"
          startIcon={<ArrowBackRoundedIcon sx={{ color: '#FFF' }} />}
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: '#0F172A',
            color: '#FFFFFF',
            fontWeight: 700,
            borderRadius: 99,
            px: 2.5,
            py: 0.75,
            fontSize: '0.85rem',
            mb: 3,
            boxShadow: '0 4px 12px rgba(15,23,42,0.20)',
            '&:hover': { bgcolor: '#1E293B' },
          }}
        >
          Back
        </Button>

        <FormCardPaper elevation={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CloudUploadRoundedIcon sx={{ color: '#FFF', fontSize: 20 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: colors.textMain }}>
              Upload Course File
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 4, ml: 7 }}>
            Publish your digital assets, documents, or course files to the Neuroculas Courses community.
          </Typography>

          {alertMessage && (
            <Alert severity="warning" onClose={() => setAlertMessage(null)} sx={{ mb: 3 }}>
              {alertMessage}
            </Alert>
          )}
          {errorMessage && <Alert severity="error" sx={{ mb: 3 }}>{errorMessage}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>}

          <form onSubmit={handleSubmit}>
            {/* File Drop Zone */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: colors.textMain, mb: 1, fontWeight: 700 }}>
                Course Document / File Attachment *
              </Typography>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.txt,.csv"
                id="create-pdf-file-input"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="create-pdf-file-input">
                <Box
                  sx={{
                    border: `2px dashed ${colors.border}`,
                    borderRadius: 3,
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: colors.veryLight,
                    transition: 'border-color 0.2s ease, background-color 0.2s ease',
                    '&:hover': { borderColor: colors.primary, bgcolor: colors.soft },
                  }}
                >
                  {file ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                      <FileTypeIcon fileUrl={file.name} variant="large" size={44} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: colors.textMain }}>
                          {file.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </Typography>
                      </Box>
                      {fileConfig && (
                        <Box sx={{ px: 1.5, py: 0.5, bgcolor: fileConfig.bg, borderRadius: 2 }}>
                          <Typography variant="caption" sx={{ color: fileConfig.color, fontWeight: 700 }}>
                            {fileConfig.label} File ready to upload
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <>
                      <CloudUploadRoundedIcon sx={{ fontSize: 48, color: colors.primary, mb: 1 }} />
                      <Typography variant="body1" sx={{ fontWeight: 700, color: colors.textMain, mb: 0.5 }}>
                        Click to select document or archive
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                        PDF, DOCX, PPTX, XLSX, ZIP, TXT — max 10 MB
                      </Typography>
                    </>
                  )}
                </Box>
              </label>
            </Box>

            <TextField
              label="Course / File Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2.5 }}
            />

            <TextField
              label="Description"
              fullWidth
              required
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2.5 }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
              <TextField
                label="Price (BDT ৳)"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                helperText={priceNotice || "For now, share your course for free."}
                FormHelperTextProps={{ sx: { color: priceNotice ? colors.error : colors.primary, fontWeight: 700 } }}
              />
              <TextField
                select
                label="Language"
                fullWidth
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Bangla">Bangla</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
              </TextField>
            </Box>

            <TextField
              label="Tags (comma separated, e.g. React, Node, Web)"
              fullWidth
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              sx={{ mb: 4 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                color: '#FFF',
                py: 1.5,
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(96,165,250,0.25)',
                '&:hover': { boxShadow: '0 6px 20px rgba(96,165,250,0.38)' },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Publish Course / File'}
            </Button>
          </form>
        </FormCardPaper>
      </Container>
    </Box>
  );
};

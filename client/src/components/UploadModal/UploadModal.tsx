import React from 'react';
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { useUploadModal } from './useUploadModal';
import { StyledDialogContent, DropZoneBox } from './UploadModal.styles';
import { FileTypeIcon, getFileType, FILE_TYPE_CONFIG } from '../FileTypeIcon/FileTypeIcon';
import { colors } from '../../theme/theme';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ open, onClose, onSuccess }) => {
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
  } = useUploadModal(onSuccess);

  const fileType = file ? getFileType(file.name) : null;
  const fileConfig = fileType ? FILE_TYPE_CONFIG[fileType] : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(96,165,250,0.15)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: colors.textMain,
          fontWeight: 800,
          pb: 1.5,
          px: 3,
          pt: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2.5,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CloudUploadRoundedIcon sx={{ fontSize: 20, color: '#FFF' }} />
          </Box>
          Share / Upload File
        </Box>
        <IconButton onClick={onClose} sx={{ color: colors.textSecondary }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: colors.border }} />

      <StyledDialogContent>
        {alertMessage && (
          <Alert severity="warning" onClose={() => setAlertMessage(null)} sx={{ mb: 2 }}>
            {alertMessage}
          </Alert>
        )}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          {/* ── Drop Zone ────────────────────────────────────────────── */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="subtitle2" sx={{ color: colors.textMain, mb: 1, fontWeight: 700 }}>
              Attach File *
            </Typography>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.txt,.csv"
              id="upload-modal-file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="upload-modal-file-input">
              <DropZoneBox>
                {file ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <FileTypeIcon fileUrl={file.name} variant="large" size={40} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: colors.textMain }}>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </Typography>
                    </Box>
                    {fileConfig && (
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          bgcolor: fileConfig.bg,
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: fileConfig.color, fontWeight: 700 }}>
                          {fileConfig.label} File
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <>
                    <CloudUploadRoundedIcon sx={{ fontSize: 44, color: colors.primary, mb: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: 700, color: colors.textMain, mb: 0.5 }}>
                      Click to upload document or archive
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                      PDF, DOCX, PPTX, XLSX, ZIP, TXT — max 10 MB
                    </Typography>
                  </>
                )}
              </DropZoneBox>
            </label>
          </Box>

          <TextField
            label="Course / File Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            fullWidth
            required
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
            label="Tags (comma separated e.g. React, Node, Web)"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              fontWeight: 800,
              fontSize: '0.95rem',
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              '&:hover': { boxShadow: '0 6px 18px rgba(96,165,250,0.35)' },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: '#FFF' }} /> : 'Publish Course / File'}
          </Button>
        </form>
      </StyledDialogContent>
    </Dialog>
  );
};

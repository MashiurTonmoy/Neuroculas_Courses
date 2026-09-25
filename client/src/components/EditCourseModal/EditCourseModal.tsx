import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  MenuItem,
  Grid,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { Course } from '../../types/course';
import { courseService } from '../../services/courseService';

interface EditCourseModalProps {
  open: boolean;
  course: Course | null;
  onClose: () => void;
  onSuccess: (updatedCourse: Course) => void;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  open,
  course,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [language, setLanguage] = useState('English');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setPrice(course.price || 0);
      setLanguage(course.language || 'English');
      setTags(Array.isArray(course.tags) ? course.tags.join(', ') : '');
      setVisibility(course.visibility === 'private' ? 'private' : 'public');
      setSelectedFile(null);
      setError('');
    }
  }, [course, open]);

  if (!course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('price', price.toString());
      formData.append('language', language);
      formData.append('tags', tags);
      formData.append('visibility', visibility);

      if (selectedFile) {
        formData.append('document', selectedFile);
      }

      const res = await courseService.updateCourse(course._id, formData);
      onSuccess(res.course);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update material. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          border: '1.5px solid #BAE6FD',
          boxShadow: '0 20px 60px rgba(56, 189, 248, 0.20)',
          p: 1,
        },
      }}
    >
      {/* ── Dialog Header ────────────────────────────────────────────── */}
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              bgcolor: '#E0F2FE',
              border: '1px solid #BAE6FD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
            }}
          >
            <EditRoundedIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              Edit Learning Material
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Update all fields, file document, pricing, and visibility settings.
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} disabled={loading} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1, pb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

          {/* Title */}
          <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Description */}
          <TextField
            label="Description"
            fullWidth
            required
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Grid container spacing={2}>
            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price (৳) — 0 for Free"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
              />
            </Grid>
            {/* Language */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Language"
                fullWidth
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {['English', 'Bangla', 'Spanish', 'French', 'German', 'Other'].map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Tags */}
          <TextField
            label="Tags (comma-separated)"
            placeholder="e.g. math, calculus, notes, pdf"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* ── Visibility Selector ─────────────────────────────────────── */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Visibility Status
            </Typography>
            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Box
                  onClick={() => setVisibility('public')}
                  sx={{
                    p: 1.75,
                    borderRadius: 4,
                    border: '1.5px solid',
                    borderColor: visibility === 'public' ? '#38BDF8' : '#E2E8F0',
                    bgcolor: visibility === 'public' ? '#F0F9FF' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    transition: 'all 0.2s ease',
                    boxShadow: visibility === 'public' ? '0 4px 12px rgba(56, 189, 248, 0.15)' : 'none',
                  }}
                >
                  <LanguageRoundedIcon sx={{ color: visibility === 'public' ? '#0284C7' : '#94A3B8' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: visibility === 'public' ? '#0284C7' : '#475569' }}>
                      Public
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', lineHeight: 1.2, fontSize: '0.7rem' }}>
                      Visible to everyone
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  onClick={() => setVisibility('private')}
                  sx={{
                    p: 1.75,
                    borderRadius: 4,
                    border: '1.5px solid',
                    borderColor: visibility === 'private' ? '#38BDF8' : '#E2E8F0',
                    bgcolor: visibility === 'private' ? '#F0F9FF' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    transition: 'all 0.2s ease',
                    boxShadow: visibility === 'private' ? '0 4px 12px rgba(56, 189, 248, 0.15)' : 'none',
                  }}
                >
                  <LockRoundedIcon sx={{ color: visibility === 'private' ? '#0284C7' : '#94A3B8' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: visibility === 'private' ? '#0284C7' : '#475569' }}>
                      Private
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', lineHeight: 1.2, fontSize: '0.7rem' }}>
                      Only owner &amp; admin
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* ── Document Replacement (Optional) ────────────────────────── */}
          <Box sx={{ mt: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Replace Document File (Optional)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              startIcon={<CloudUploadIcon />}
              sx={{
                py: 1.25,
                borderRadius: 3,
                borderColor: '#BAE6FD',
                color: '#0284C7',
                bgcolor: '#F0F9FF',
                fontWeight: 700,
                '&:hover': { bgcolor: '#E0F2FE', borderColor: '#38BDF8' },
              }}
            >
              {selectedFile ? selectedFile.name : 'Upload New File to Replace Current Document'}
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar,.txt,.csv"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
            {selectedFile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: '#0284C7' }}>
                <InsertDriveFileRoundedIcon fontSize="small" />
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} disabled={loading} sx={{ fontWeight: 700, color: '#64748B' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <EditRoundedIcon />}
            sx={{
              bgcolor: '#0284C7',
              color: '#FFFFFF',
              fontWeight: 800,
              px: 3,
              borderRadius: 3,
              '&:hover': { bgcolor: '#0369A1' },
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

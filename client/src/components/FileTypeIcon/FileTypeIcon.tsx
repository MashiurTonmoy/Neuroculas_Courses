import React from 'react';
import { Box } from '@mui/material';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

export type FileType = 'pdf' | 'doc' | 'ppt' | 'xls' | 'zip' | 'txt' | 'csv' | 'unknown';

export const FILE_TYPE_CONFIG: Record<FileType, { label: string; color: string; bg: string }> = {
  pdf:     { label: 'PDF',  color: '#E53935', bg: '#FFEBEE' },
  doc:     { label: 'DOC',  color: '#1565C0', bg: '#E3F2FD' },
  ppt:     { label: 'PPT',  color: '#BF360C', bg: '#FBE9E7' },
  xls:     { label: 'XLS',  color: '#2E7D32', bg: '#E8F5E9' },
  zip:     { label: 'ZIP',  color: '#6A1B9A', bg: '#F3E5F5' },
  txt:     { label: 'TXT',  color: '#0277BD', bg: '#E1F5FE' },
  csv:     { label: 'CSV',  color: '#00695C', bg: '#E0F2F1' },
  unknown: { label: 'FILE', color: '#F472B6', bg: '#EFF6FF' },
};

export const getFileType = (fileUrl?: string): FileType => {
  if (!fileUrl) return 'unknown';
  const ext = fileUrl.substring(fileUrl.lastIndexOf('.')).toLowerCase();
  if (ext === '.pdf') return 'pdf';
  if (['.doc', '.docx'].includes(ext)) return 'doc';
  if (['.ppt', '.pptx'].includes(ext)) return 'ppt';
  if (['.xls', '.xlsx'].includes(ext)) return 'xls';
  if (['.csv'].includes(ext)) return 'csv';
  if (['.zip', '.rar'].includes(ext)) return 'zip';
  if (['.txt'].includes(ext)) return 'txt';
  return 'unknown';
};

const IconMap: Record<FileType, React.ElementType> = {
  pdf:     PictureAsPdfRoundedIcon,
  doc:     DescriptionRoundedIcon,
  ppt:     SlideshowRoundedIcon,
  xls:     TableChartRoundedIcon,
  csv:     TableChartRoundedIcon,
  zip:     FolderZipRoundedIcon,
  txt:     TextSnippetRoundedIcon,
  unknown: InsertDriveFileRoundedIcon,
};

interface FileTypeIconProps {
  fileUrl?: string;
  size?: number;
  /** 'badge' = small rounded square, 'large' = centred big icon, 'compact' = tiny inline */
  variant?: 'badge' | 'large' | 'compact';
}

export const FileTypeIcon: React.FC<FileTypeIconProps> = ({
  fileUrl,
  size,
  variant = 'badge',
}) => {
  const type = getFileType(fileUrl);
  const { color, bg, label } = FILE_TYPE_CONFIG[type];
  const Icon = IconMap[type];

  if (variant === 'large') {
    const iconSize = size ?? 56;
    return (
      <Box
        sx={{
          width: iconSize + 24,
          height: iconSize + 24,
          borderRadius: 4,
          bgcolor: bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: iconSize, color }} />
        <Box
          component="span"
          sx={{
            fontSize: '0.65rem',
            fontWeight: 800,
            color,
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}
        >
          {label}
        </Box>
      </Box>
    );
  }

  if (variant === 'compact') {
    const iconSize = size ?? 20;
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          bgcolor: bg,
          borderRadius: 1.5,
          px: 0.75,
          py: 0.25,
        }}
      >
        <Icon sx={{ fontSize: iconSize, color }} />
        <Box
          component="span"
          sx={{ fontSize: '0.65rem', fontWeight: 800, color, letterSpacing: '0.04em' }}
        >
          {label}
        </Box>
      </Box>
    );
  }

  // badge (default)
  const badgeSize = size ?? 40;
  return (
    <Box
      sx={{
        width: badgeSize,
        height: badgeSize,
        borderRadius: 2.5,
        bgcolor: bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon sx={{ fontSize: badgeSize * 0.52, color }} />
      <Box
        component="span"
        sx={{ fontSize: '0.5rem', fontWeight: 800, color, letterSpacing: '0.04em', mt: '-1px' }}
      >
        {label}
      </Box>
    </Box>
  );
};

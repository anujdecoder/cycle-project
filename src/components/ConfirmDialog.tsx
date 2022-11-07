import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import { stopPropagation } from '../utils/utils'
import { LoadingButton } from '@mui/lab'
import Flex from './Flex'
import { CloseOutlined } from '@mui/icons-material'

interface Props {
  title: React.ReactNode
  message: React.ReactNode
  open: boolean
  onClose: () => void
  loading?: boolean
  cancelLabel?: React.ReactNode
  confirmLabel?: React.ReactNode
  onConfirm: () => void
}

const ConfirmDialog: React.FC<Props> = ({
  title,
  message,
  open,
  onClose,
  loading,
  cancelLabel = 'Cancel',
  confirmLabel = 'Save',
  onConfirm
}) => {
  return (
    <Dialog open={open} onClose={onClose} onClick={stopPropagation} scroll="paper" disableEscapeKeyDown>
      <DialogTitle>
        <Flex justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ paddingTop: '8px' }}>
            {title}
          </Typography>
          <Tooltip title={'Close'}>
            <IconButton onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Flex>
      </DialogTitle>
      <DialogContent sx={{ margin: '16px 0' }}>
        <Typography variant="subtitle2">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ margin: '0 16px 16px' }}>
        <Button variant="outlined">{cancelLabel}</Button>
        <LoadingButton variant="contained" loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog

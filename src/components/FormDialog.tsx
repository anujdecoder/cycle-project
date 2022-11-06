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
  formId: string
  title: React.ReactNode
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  loading?: boolean
  cancelLabel?: React.ReactNode
  submitLabel?: React.ReactNode
}

const FormDialog: React.FC<Props> = ({
  formId,
  title,
  open,
  onClose,
  children,
  loading,
  cancelLabel = 'Cancel',
  submitLabel = 'Save'
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
      <DialogContent sx={{ margin: '16px 0' }}>{children}</DialogContent>
      <DialogActions sx={{ margin: '0 16px 16px' }}>
        <Button variant="outlined">{cancelLabel}</Button>
        <LoadingButton variant="contained" loading={loading} form={formId} type="submit">
          {submitLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog

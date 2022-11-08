import { CheckBoxOutlined, IndeterminateCheckBoxOutlined } from '@mui/icons-material'
import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import { debounce } from 'lodash-es'
import React, { FC, useEffect, useRef } from 'react'
import useUpdatedRef from '../hooks/useUpdatedRef'
import { LinearProgress } from '@mui/material'

export type TableGridProps = DataGridProps & {
  loadMore?: () => void
}

const DataTable: FC<TableGridProps> = ({ loading, loadMore, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const loadMoreRef = useUpdatedRef(loadMore)
  const loadingRef = useUpdatedRef(loading)

  useEffect(() => {
    if (ref.current) {
      const scrollEl = ref.current.querySelector('.MuiDataGrid-virtualScroller')
      if (scrollEl) {
        const onScroll = debounce(() => {
          if (
            !loadingRef.current &&
            scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight < 50
          ) {
            loadMoreRef.current?.()
          }
        }, 50)
        scrollEl.addEventListener('scroll', onScroll)
        return () => {
          scrollEl.removeEventListener('scroll', onScroll)
        }
      }
    }
  }, [loadMoreRef, loadingRef, props.rows.length])

  return (
    <DataGrid
      sx={[
        {
          border: 'none',
          '.MuiDataGrid-columnSeparator': { display: 'none' },
          '.MuiDataGrid-columnHeaderTitle': { fontWeight: '700' },
          '.MuiDataGrid-row': { ...(props.onRowClick ? { cursor: 'pointer' } : {}) },
          '.MuiDataGrid-virtualScroller': { ...(loading ? { opacity: 0.5 } : {}) },
          '.MuiDataGrid-cell, .MuiDataGrid-columnHeader': { outline: 'none!important' },
        },
      ]}
      componentsProps={{
        baseCheckbox: {
          indeterminateIcon: <IndeterminateCheckBoxOutlined />,
          checkedIcon: <CheckBoxOutlined />,
        },
      }}
      components={{
        LoadingOverlay: LinearProgress,
      }}
      sortingMode="server"
      disableSelectionOnClick
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      hideFooter
      {...props}
      ref={ref}
      loading={loading}
    />
  )
}

export default DataTable

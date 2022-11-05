import React from 'react'

export interface SubApp {
  icon: React.ReactElement
  title: React.ReactNode
  path: string
  component: React.LazyExoticComponent<any>
  adminApp?: boolean
}

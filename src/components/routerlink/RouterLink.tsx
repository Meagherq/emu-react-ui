import React from 'react'
import { LinkProps, Link } from 'react-router-dom'

const RouterLink = (to: string) => 
  React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
    <Link className='SubmoduleLink' to={to} ref={ref} {...itemProps} />
  ))

export default RouterLink
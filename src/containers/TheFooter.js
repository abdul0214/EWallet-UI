import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  let fullYear = new Date().getFullYear();
  return (
    <CFooter fixed={false}>
    <div className="mfs-auto">
    <a href="https://awayoffice.web.app/" target="_blank" rel="noopener noreferrer">EWallet</a>
    <span className="ml-1">&copy;{fullYear}</span>
    </div>
    </CFooter>
    )
  }

  export default React.memo(TheFooter)

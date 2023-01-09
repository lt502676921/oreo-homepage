import { useEffect } from 'react'
// import vconsole from 'vconsole'

const VConsole = () => {
  useEffect(() => {
    const vconsole = require('vconsole')
    process.env.NODE_ENV === 'development' && new vconsole()
  }, [])

  return <></>
}

export default VConsole

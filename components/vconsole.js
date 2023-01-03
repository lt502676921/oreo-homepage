import vconsole from 'vconsole'

function VConsole() {
  const vConsole = process.env.NODE_ENV === 'development' ? new vconsole() : ''

  return <></>
}

export default VConsole

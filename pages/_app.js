import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import theme from '../lib/theme'
// import Script from 'next/script'
// import { useEffect } from 'react'

function Website({ Component, pageProps, router }) {
  // useEffect(() => {
  //   console.log(this === window)
  //   const VConsole = require('vconsole')
  //   new VConsole()
  // }, [])

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence
          // exitBeforeEnter
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
      {/* <Script
        src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
        onLoad={() => {
          const vConsole = new window.VConsole()
        }}
      /> */}
    </ChakraProvider>
  )
}

export default Website

import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
import NavBar from '../navbar'
import Lynkco09Loader from '../lynkco09-loader'
import Footer from '../footer'

// const VConsole = dynamic(() => import('../vconsole'), {
//   ssr: false
// })

const LazyCar = dynamic(() => import('../lynkco09'), {
  ssr: false,
  loading: () => <Lynkco09Loader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Oreo Li - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <LazyCar />

        {children}

        <Footer />
      </Container>

      {/* <VConsole /> */}
    </Box>
  )
}

export default Main

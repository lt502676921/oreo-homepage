import NextLink from 'next/link'
import {
  Container,
  Box,
  Heading,
  useColorModeValue,
  chakra,
  Link,
  Button
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { IoLogoGithub } from 'react-icons/io5'
import Image from 'next/legacy/image'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Page = () => {
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          mb={6}
          p={3}
          align="center"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          css={{ backdropFilter: 'blur(10px)' }}
        >
          Hello, I&apos;m a Front-end developer based in Hangzhou, China!
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Oreo Li
            </Heading>
            <p>A Developer who still on his way</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="100px"
              h="100px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ProfileImage
                src="/images/oreo.jpg"
                alt="Profile image"
                borderRadius="full"
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            Oreo is a Front-end Developer based in Hangzhou with a passion for
            building digital services/stuff he wants. He is full of curiosity
            about all things launching products, from planning and designing all
            the way to solving real-life problems with code. 
            {/* When not online, he
            loves hanging out with his &quot;Juliet&quot;. Currently, he is
            working at a Chinese Automobile Manufacturer called{' '}
            <Link href="http://zgh.com/">Geely</Link>. */}
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink
              href="https://github.com/lt502676921"
              passHref
              scroll={false}
            >
              <Button
                leftIcon={<IoLogoGithub />}
                rightIcon={<ChevronRightIcon />}
                colorScheme="teal"
              >
                My GitHub
              </Button>
            </NextLink>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>1997</BioYear>
            Born in Deqing, China.
          </BioSection>
          <BioSection>
            <BioYear>2021</BioYear>
            Completed the Bachelor&apos;s Program in the School of Information
            Engineering at Zhejiang University of Water Resources and Electric
            Power
          </BioSection>
          <BioSection>
            <BioYear>2021 to 2023</BioYear>
            Working at <Link href="http://zgh.com/">Geely</Link>, Hangzhou
          </BioSection>
          <BioSection>
            <BioYear>2023 to 2024</BioYear>
            Working at <Link href="https://www.best-inc.com/#/">Best Inc</Link>, Hangzhou
          </BioSection>
          <BioSection>
            <BioYear>2024 to present</BioYear>
            Working at <Link href="https://www.alibabagroup.com/">Alibaba Group</Link>, Hangzhou
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I ♥
          </Heading>
          <Paragraph>Music, Play badminton, Machine Learning</Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page

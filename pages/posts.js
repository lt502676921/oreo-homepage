import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { PostGridItem } from '../components/grid-item'

import thumbBuiltInAI from '../public/images/contents/thumbBuiltInAI.png'


const Posts = () => (
  <Layout title="Posts">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Popular Posts
      </Heading>

      <Section delay={0.1}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <PostGridItem
            title="Power your web app with Gemini Nano"
            id="built-in-ai"
            thumbnail={thumbBuiltInAI}
          />
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Posts
export { getServerSideProps } from '../components/chakra'

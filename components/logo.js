import Link from 'next/link'
import { Text, useColorModeValue } from '@chakra-ui/react'
import OreoIcon from './icons/oreo'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  return (
    <Link href="/" legacyBehavior>
      <a style={{ display: 'flex', alignItems: 'center' }}>
        <LogoBox>
          {/* <FootprintIcon /> */}
          <OreoIcon />
          <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontFamily='M PLUS Rounded 1c", sans-serif'
            fontWeight="bold"
            ml={3}
          >
            &nbsp;&nbsp;&nbsp;Oreo Li
          </Text>
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo

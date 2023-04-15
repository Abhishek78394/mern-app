import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Error = () => {
return (
  <Container h="90vh" p="8">
  <Heading my="8" textAlign={'center'} size={'lg'}>
   Response Success Submitted
  </Heading>
  <VStack boxShadow={'lg'} pb="16" alignItems={'center'} borderRadius="lg">
  <Box
        w="full"
        bg="yellow.400"
        p="4"
        css={{ borderRadius: '8px 8px 0 0' }}
      >
        <Text color={'black'}>Success</Text>
      </Box>
      <Box p="4">
        <VStack textAlign={'center'} px="8" mt="4" spacing={'8'}>
          <Text>
           You don't have submit Your Response
          </Text>

          <Heading size={'4xl'}>
            <RiCheckboxCircleFill />
          </Heading>
        </VStack>
      </Box>
      <Link to="/insert">
        <Button variant={'ghost'}>Go to Response Page</Button>
      </Link>

      <Heading size={'xs'}>Please prodvide a vaild details</Heading>


  </VStack>
  </Container>
)
}

export default Error
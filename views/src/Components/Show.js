import React, {useEffect} from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,Box,
  Th,
  Td,
  TableContainer,
  ChakraProvider,
  Heading,
  HStack,
  Button,
} from '@chakra-ui/react'
import axios from "axios";
import Cookies from "universal-cookie";
import {  useNavigate } from 'react-router-dom';
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'

export default function Show() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([])
  const cookies = new Cookies();
  const token = cookies.get('token')
  const sumbmitHandler = async (e) => {
   console.log(token)
   const api =process.env.REACT_APP_API_URL;
     await axios.get(`${api}/getdata?token=${token}`)
      .then((e) => {
       setData(e.data.products)
        console.log(e.data.products)
      }).catch(error => {
        console.log(error)
      })
    }

    useEffect(() => {
      sumbmitHandler();
    }, [])

    const delete_handler = async(e)=>{
      const id = e.target.closest('[data-key]').getAttribute('data-key');
      console.log(id)
      const api = process.env.REACT_APP_API_URL;
     await axios.get(`${api}/delete_product?id=${id}`)
  }


    const updateHnadler =  (e)=>{
      const id = e.target.closest('[data-key]').getAttribute('data-key');
      console.log(id)
      navigate(`/update_product/${id}`);
 }
    return (
      <ChakraProvider>
       <Box w="90vw" m="10"> 
      <TableContainer>
      <Heading my="8" textAlign={'center'} size={'lg'}>
   Total data is here
  </Heading>
  <Table variant='simple'>
    <Thead  w="full"
        bg="yellow.400"
        p="4"
        css={{ borderRadius: '8px 8px 0 0' }}>
      <Tr>
        <Th>No.</Th>
        <Th>consignment_no</Th>
        <Th>pieces</Th>
        <Th>City</Th>
        <Th>Status</Th>
        <Th>Create Time</Th>
        <Th>update</Th>
      </Tr>
    </Thead>
      {data && data.map((e,i)=>{
       console.log(e)
        return<Tbody>
        {/* console.log(e.city) */}
      <Tr>

<Td>{i+1}</Td>
<Td>{e.unique_no}</Td>
<Td >{e.pieces}</Td>
<Td >{e.city}</Td>
<Td >{e.status}</Td>
<Td >{e.createdAt.split("T")[0] }</Td> 
<Td>{e._id ? (<>
                                            <HStack>
                                          
                                                <Button  key={i} value={e._id}  onClick={delete_handler} data-key={e._id} variant={'ghost'} colorScheme={'yellow'}>
                                                    <DeleteIcon key={i} w={4} h={4} color="red.500" />
                                                </Button>
                                            
                                         
                                                <Button  onClick={updateHnadler} key={i} value={e._id} variant={'ghost'} colorScheme={'yellow'}  data-key={e._id}>
                                                    <AddIcon w={4} h={4} color="red.500" />
                                                </Button>
                                       
                                            </HStack>
                                        </>
                                        ) : "noop..."}</Td>
      </Tr> 
    </Tbody>
      })}

    
     
    
  </Table>

</TableContainer>
</Box>
      </ChakraProvider>
    );
  }
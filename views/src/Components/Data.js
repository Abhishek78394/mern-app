import * as React from "react";
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
  Button
} from '@chakra-ui/react'
import axios from "axios";
import Cookies from "universal-cookie";
import {  useNavigate } from 'react-router-dom';

import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'

export default function Data() {
  const [data, setData] = React.useState([])
  const cookies = new Cookies();
  const token = cookies.get('token')
 const navigate= useNavigate();
  const sumbmitHandler = async (e) => {
   const api = process.env.REACT_APP_API_URL;
     await axios.get(`/getdata?token=${token}`)
      .then((e) => {
        const d = e.data.products
       console.log(e)
       const a= d.filter((e)=>{
          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1;
          if (mm < 10) mm = '0' + mm;
          const dateNow = yyyy+"-"+mm;
          const createDate = e.createdAt.split("T")[0].slice(0, 7);
        //   if(dateNow===createDate){
        // console.log(e)

        //   }
          return dateNow===createDate;

       })
       console.log(a)
        setData(a)
      }).catch(error => {
        console.log(error)
      })
    }

    React.useEffect(() => {
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
 This Month data is here...........................
  </Heading>
  <Table variant='simple'>
    <Thead  w="full"
        bg="yellow.500"
        p="4"
        color="#fff"
        css={{ borderRadius: '8px 8px 0 0' }}>
      <Tr >
        <Th color="#fff">No.</Th>
        <Th color="#fff">consignment_no</Th>
        <Th color="#fff">pieces</Th>
        <Th color="#fff">City</Th>
        <Th color="#fff">Status</Th>
        <Th color="#fff">Create Time</Th>
        <Th color="#fff">update</Th>
      </Tr>
    </Thead>
      {data && data.map((e,i)=>{
       
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
                                                    <DeleteIcon  w={4} h={4} color="red.500" />
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
import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr, Box,
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
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'

export default function Show() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([])
  const [deliver_data, setDeliver_data] = React.useState([])
  const cookies = new Cookies();
  const token = cookies.get('token')

  const sumbmitHandler = async (e) => {
    const api = process.env.REACT_APP_API_URL;
    await axios.get(`/getdata?token=${token}`)
      .then((e) => {
        setDeliver_data(e.data.deliver_products)
        setData(e.data.products)
        console.log(e.data.products)
        console.log(e.data)
      }).catch(error => {
        console.log(error)
      })
  }
 

  const delete_handler = async (e) => {
    const id = e.target.closest('[data-key]').getAttribute('data-key');
    const api = process.env.REACT_APP_API_URL;
    await axios.get(`/delete_product?id=${id}`)
  
      sumbmitHandler();
   
  }




  const updateHnadler = (e) => {
    const id = e.target.closest('[data-key]').getAttribute('data-key');
    console.log(id)
    navigate(`/update_product/${id}`);
   
  }

  useEffect(() => {
    sumbmitHandler();
  }, [])


  return (
    <ChakraProvider>
      <Box w="90vw" m="10">
        <TableContainer>
          <Heading my="8" textAlign={'center'} size={'lg'}>
            Total data is here!
          </Heading>


          <table class="table  table-striped table-bordered">
            <thead className="bg-primary-subtle">
              <tr>  
                <th>NO.</th>
                <th>CONSIGNMENT_NO</th>
                <th> PIECES </th>
                <th>  PICKUP CITY</th>
                <th>  DELIVERED CITY</th>
                {/* <th>Status</th> */}
                <th>PICKUP DATE  </th>
                <th>DELIVER DATE  </th>
                <th>Action</th>
              </tr>
            </thead>

            {data && data.map((e, i) => {
  return (
    <tbody key={i}>
   
      {deliver_data && deliver_data.map((ee, ii) => {
        return (
          <tr key={ii}>
            
                  <td>{i + 1}</td>
                  <td>{e.unique_no} </td>
                  <td> {e.pieces} </td>
                  <td>{e.city} </td>
                  <td>{ee.unique_no && e.unique_no ? ee.city : "noop"}</td>
                 
                  <td> {e.createdAt.split("T")[0]} {e.createdAt.split("T")[1]}  </td>
                  <td> {e._id ? (<>
                    <HStack>

                      <Button key={i} value={e._id} onClick={delete_handler} data-key={e._id} variant={'ghost'} colorScheme={'yellow'}>
                        <DeleteIcon key={i} w={4} h={4} color="red.500" />
                      </Button>


                      <Button onClick={updateHnadler} key={i} value={e._id} variant={'ghost'} colorScheme={'yellow'} data-key={e._id}>
                        <AddIcon w={4} h={4} color="red.500" />
                      </Button>

                    </HStack>
                  </>
                  ) : "noop..."}   </td>
                </tr>
        )
})}

</tbody>)
      })}
      </table>




        </TableContainer>
      </Box>
    </ChakraProvider>
  );
}
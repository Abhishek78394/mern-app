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
    Link,
    Button,
    useDisclosure,
    VStack,
    HStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import axios from "axios";
import Cookies from "universal-cookie";

const Show_user = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = React.useState([])
    const cookies = new Cookies();
    const token = cookies.get('token')
    const sumbmitHandler = async (e) => {
        console.log(token)
        const api = process.env.REACT_APP_API_URL;
        await axios.get(`${api}/getUser?token=${token}`)
            .then((e) => {
                console.log(e)
                setData(e.data.users)
                console.log(data)
            }).catch(error => {
                console.log(error)
            })
    }


    const delete_handler = async (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
        const api = process.env.REACT_APP_API_URL;
        await axios.get(`${api}/delete_user?id=${id}`)
    }

    useEffect(() => {
        sumbmitHandler();

    }, [])

    const updateHnadler = (e) => {
        const id = e.target.closest('[data-key]').getAttribute('data-key');
        console.log(id)
        navigate(`/update_user/${id}`);
    }
    return (
        <>
            <ChakraProvider>
                <Box w="95vw" m="5">
                    <TableContainer>
                        <Heading my="8" textAlign={'center'} size={'lg'}>
                            Total data is here
                        </Heading>
                        <Table variant='simple'>
                            <Thead w="full"
                                bg="yellow.400"
                                p="4"
                                css={{ borderRadius: '8px 8px 0 0' }}>
                                <Tr>
                                    <Th>N0.</Th>
                                    <Th>Name</Th>
                                    <Th>DOB</Th>
                                    <Th>contact no</Th>
                                    <Th> user_id </Th>
                                    <Th> password </Th>
                                    <Th > Aadhar_no </Th>
                                    <Th>Adress</Th>
                                    <Th>update</Th>

                                </Tr>
                            </Thead>
                            {data && data.map((e, i) => {
                                const id = e._id
                                return <Tbody>
                                    <Tr>

                                        <Td>{i + 1}</Td>
                                        <Td>   {e.name ? e.name : 'noop....'} </Td>
                                        <Td >   {e.date_of_birth ? e.date_of_birth : "noop..."} </Td>
                                        <Td >  {e.contact_no ? e.contact_no : "noop..."}  </Td>
                                        <Td > {e.user_id ? e.user_id : "noop.."} </Td>
                                        <Td > {e.password ? e.password : "noop.."}   </Td>
                                        <Td > {e.aadhar_no ? e.aadhar_no : "noop.."} </Td>
                                        <Td>{e.permanent_add ? e.permanent_add : "noop.."}</Td>

                                        <Td>{e._id ? (<>
                                            <HStack>

                                                <Button key={e._id} value={e._id} onClick={delete_handler} data-key={e._id} variant={'ghost'} colorScheme={'yellow'}>
                                                    <DeleteIcon key={e._id} w={4} h={4} color="red.500" />
                                                </Button>

                                                <Link onClick={onClose} to='/update_user'>
                                                    <Button onClick={updateHnadler} key={e._id} value={e._id} variant={'ghost'} colorScheme={'yellow'} data-key={e._id}>
                                                        <AddIcon w={4} h={4} color="red.500" />
                                                    </Button>
                                                </Link>
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



        </>
    )
}

export default Show_user
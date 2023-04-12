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
        await axios.get(`/getUser?token=${token}`)
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
        await axios.get(`/delete_user?id=${id}`)
        navigate('/show_user')
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
                        <table class="table  table-striped table-bordered">
                            <thead className="bg-primary-subtle">
                                <tr>
                                    <th>NO.</th>
                                    <th>NAME</th>
                                    <th>DOB  </th>
                                    <th> CONTACT NO</th>
                                    <th>PASSWORD</th>
                                    <th> AADHAR NO </th>
                                    <th>ADDRESS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>


                            {data && data.map((e, i) => {
                                const id = e._id
                                return <tbody>
                                    <tr>
                                        <td>  {i + 1}  </td>
                                        <td>   {e.name ? e.name : 'noop....'}   </td>
                                        <td>   {e.date_of_birth ? e.date_of_birth : "noop..."}  </td>
                                        <td>  {e.contact_no ? e.contact_no : "noop..."}   </td>
                                        <td>  {e.password ? e.password : "noop.."}     </td>
                                        <td> {e.aadhar_no ? e.aadhar_no : "noop.."}   </td>
                                        <td>   {e.permanent_add ? e.permanent_add : "noop.."} </td>
                                        <td>  {e._id ? (<>
                                            <p>

                                                <Button key={e._id} value={e._id} onClick={delete_handler} data-key={e._id} variant={'ghost'} colorScheme={'yellow'}>
                                                    <DeleteIcon key={e._id} w={4} h={4} color="red.500" />
                                                </Button>

                                                <Link onClick={onClose} to='/update_user'>
                                                    <Button onClick={updateHnadler} key={e._id} value={e._id} variant={'ghost'} colorScheme={'yellow'} data-key={e._id}>
                                                        <AddIcon w={4} h={4} color="red.500" />
                                                    </Button>
                                                </Link>
                                            </p>
                                        </>
                                        ) : "noop..."}  </td>


                                    </tr>
                                </tbody>

                            })}

                        </table>




                    </TableContainer>
                </Box>
            </ChakraProvider>



        </>
    )
}

export default Show_user
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
const Create_user = () => {

  const [logined, setLogined] = useState(false);
  const [name, setName] = useState('');
  const [contact_no, setContact_no] = useState('');
  const [date_of_birth,setDate_of_birth] = useState('');
  const [permanent_add, setPermanent_add] = useState('');
  const [aadhar_no, setAadhar_no] = useState('');
const [err, setErr] = useState('');
  const data = {
    name,
    contact_no,
    date_of_birth,
    permanent_add,
    aadhar_no
  }



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const sumbmitHandler = async (e) => {
    e.preventDefault();
    console.log(data)
    const api = process.env.REACT_APP_API_URL;
    console.log(api)
    await axios.post(`/signup`,data ,{
      headers: { 'Content-Type': 'application/json' }
    })
      .then((data) => {
    

        navigate('/show_user')
      }).catch(error => {
        console.log(error.response.data.message)
        setErr(error.response.data.message)
      })

    }

  return (
    <>
  <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading children={'Welcome '} />

        
        <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
        <Box my={'4'}>
            <FormLabel htmlFor="Name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="john Doe"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          
          <Box my={'4'}>
            <FormLabel htmlFor="Date_of_birth" children="date_of_birth" />
            <Input
              required
              id="date_of_birth"
              value={date_of_birth}
              onChange={e => setDate_of_birth(e.target.value)}
              placeholder="Enter birth date"
              type={'date'}
              focusBorderColor="yellow.500"
            />
          </Box>
          
          <Box my={'4'}>
            <FormLabel htmlFor="Contact_no" children="Contact_no" />
            <Input
              required
              id="date_of_birth"
              value={contact_no}
              onChange={e => setContact_no(e.target.value)}
              placeholder="Enter Contact No"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Permanent_add" children="Permanent_add" />
            <Input
              required
              id="permanent_add"
              value={permanent_add}
              onChange={e => setPermanent_add(e.target.value)}
              placeholder="Enter Permanent address"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="Aadhar_no" children="Aadhar_no" />
            <Input
              required
              id="aadhar_no"
              value={aadhar_no}
              onChange={e => setAadhar_no(e.target.value)}
              placeholder="Enter Aadhar number"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
{err && err}
          <Button my="4" colorScheme={'yellow'} type="submit">
           create user
          </Button>
        </form>
        </VStack>
    </Container>
</>
  )
}

export default Create_user
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";

const Login = () => {
    const [user_id, setUser_id] = useState('');
    const [logined, setLogined] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cookies = new Cookies();
    const sumbmitHandler = async (e) => {
      e.preventDefault();
      const api = process.env.REACT_APP_API_URL;
      console.log(api)
      await axios.post(`/signin`,{user_id,password} ,{
        headers: { 'Content-Type': 'application/json' }
      })
        .then((data) => {
          console.log(data);
          const dataType = data.data.user.type;
          console.log(dataType)
          if(dataType=="admin"){
            cookies.set('token', data['data']['token'])
            console.log(cookies.get('token'))
            setLogined(true)
            dispatch({ type: "login" })
            navigate('/insert')
          }
          cookies.set('token', data['data']['token'])
          navigate('/insert')
        }).catch(error => {
          console.log(error)
        })

      }

      
  return (
    <Container h={'95vh'}>
        <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading children={'Welcome '} />

        
        <form onSubmit={sumbmitHandler} style={{ width: '100%' }}>
        <Box my={'4'}>
            <FormLabel htmlFor="user_id" children="user_id " />
            <Input
              required
              id="user_id"
              value={user_id}
              onChange={e => setUser_id(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button my="4" colorScheme={'yellow'} type="submit">
            Login
          </Button>
        </form>
        </VStack>
    </Container>
  )
}

export default Login
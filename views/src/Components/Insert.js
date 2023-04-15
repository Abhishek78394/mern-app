import { Box, Button, RadioGroup, Radio, Container, FormLabel, Heading, Input, VStack, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};
const Insert = () => {
  const cookies = new Cookies();
  const token = cookies.get('token')
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [unique_no, setUnique_no] = useState("");
  const [pieces, setPieces] = useState("");
  const [city, setCity] = useState("");
  const [err, setErr] = useState(null);

  const changeUnique_no = (e) => {
    setUnique_no(e.target.value)
    console.log(e.target.value)
  }
  const changeCity = (e) => {
    setCity(e.target.value)

  }
  const changePieces = (e) => {
    setPieces(e.target.value)
    
  }
  const changeStatus = (e) => {
    setStatus(e)
  }
 const data = {status, pieces, city, unique_no, token }

  const sumbmitHandler = async (e) => {
    try {
      e.preventDefault();
      const api = process.env.REACT_APP_API_URL;
      await axios.post(`/insert`, data, {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("submit the response")
      console.log(e, "frtstststst")
      navigate('/Sucees'
      )
    } catch (error) {
      navigate("/error")
      console.log(error.response.data)
      console.log(error,"sdfgfdsdfgdsdfdsdf")
      setErr(error.response.data)

      console.log(error.config);
    }
  }
  return (
    <Container h={'100vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'6'}>
        <Heading textTransform={'uppercase'} fontSize={'2xl'} children={'Submit Your Response'} />
        <form style={{ width: '100%' }} onSubmit={sumbmitHandler}>
          <Box my="4" display={'flex'} justifyContent="center">
          </Box>
          <Box my={'2'}>
            <FormLabel children=">consignment_no" />
            <Input
              required
              name="unique_no"
              onChange={changeUnique_no}
              placeholder=">C_node_no"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'2'} key="pieces" >
            <FormLabel htmlFor="pieces" children="No Of Pieces" />
            <Input
              required
              id="pieces"
              name={pieces}
              onChange={changePieces}
              placeholder="No Of Pieces"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'2'} >
            <FormLabel htmlFor="City" children="City" />
            <Input
              required
              id="city"
              name="city"
              onChange={changeCity}
              placeholder="Enter City Name"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'5'} key="status" >
            <FormLabel htmlFor="Status" children="Status"  >
              <RadioGroup onChange={changeStatus} >
                <Stack direction='row' >
                  <Radio required
                    name='status'
                    id="status" value='Pick'>Pick</Radio>
                  <Radio required
                    name='status'
                    id="status" value='Deliver'>Deliver</Radio>
                </Stack>
              </RadioGroup>
            </FormLabel>
          </Box>
          <Box my="3"> {err && err} </Box>
          <Button my="2" colorScheme={'yellow'} type="submit">
            Submit
          </Button>


        </form>
      </VStack>
    </Container>
  )
}
export default Insert;
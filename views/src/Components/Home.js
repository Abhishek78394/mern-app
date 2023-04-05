import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateRangePicker } from "react-date-range";
import { DeleteIcon, AddIcon, } from '@chakra-ui/icons'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Box,
  ChakraProvider,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  HStack,
  Button,
} from "@chakra-ui/react";
import Cookies from "universal-cookie";
import {  useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${apiUrl}/getdata?token=${token}`);
        setApiData(response.data.products);
        setFilteredData(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const delete_handler = async (e) => {
    const id = e.target.closest('[data-key]').getAttribute('data-key');
    console.log(id)
    const api = process.env.REACT_APP_API_URL;
    await axios.get(`${api}/delete_product?id=${id}`)
  }

  const updateHnadler = (e) => {
    const id = e.target.closest('[data-key]').getAttribute('data-key');
    console.log(id)
    navigate(`/update_product/${id}`);
  }


  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
    const filtered = apiData.filter((data) => {
      const createdAt = new Date(data.createdAt);
      return (
        createdAt >= ranges.selection.startDate &&
        createdAt <= ranges.selection.endDate
      );
    });
    setFilteredData(filtered);
  };

  return (
    <ChakraProvider>
      <Box m="10" w="70vw" textAlign="center">
        <DateRangePicker
          onChange={handleDateRangeChange}
          ranges={dateRange}
        />
      </Box>
      <Box m="10" w="95vw">
        <Table variant="simple">
          <TableCaption>
            Total data is here
          </TableCaption>
          <Thead w="full"
            bg="yellow.500"
            p="4"
            color="#fff"
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
          <Tbody>
            {filteredData.map((data, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{data.unique_no}</Td>
                <Td>{data.pieces}</Td>
                <Td>{data.city}</Td>
                <Td>{data.status}</Td>
                <Td>{data.createdAt.split("T")[0]}</Td>
                <Td>
                  {data._id ? (<>
                    <HStack>
                      <Button onClick={delete_handler} data-key={data._id} variant={'ghost'} colorScheme={'yellow'}>
                        <DeleteIcon key={data._id} w={4} h={4} color="red.500" />
                      </Button>
                      <Button onClick={updateHnadler} key={data._id} value={data._id} variant={'ghost'} colorScheme={'yellow'} data-key={data._id}>
                        <AddIcon w={4} h={4} color="red.500" />
                      </Button>

                    </HStack>
                  </>
                  ) : "noop..."}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
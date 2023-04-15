import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    useDisclosure,
    VStack,
  } from '@chakra-ui/react';
import axios from 'axios';
  import React from 'react';
  import {  RiMenu5Fill } from 'react-icons/ri';
import {  useSelector } from 'react-redux';
  import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
  const cookies = new Cookies();
  const token = cookies.get('token')
  const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
    <Link onClick={onClose} to={url}>
      <Button variant={'ghost'}>{title}</Button>
    </Link>
  );
  
  const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isAuthenticated } = useSelector((state) => state.root);
    const navigate = useNavigate();
  
  const LogoutHander = async ()=>{
    console.log("first")
    const api = process.env.REACT_APP_API_URL;
await axios.get(`${api}/signout?token=${token}`)
cookies.remove("token")
navigate('/login')
  }
    return (
      <>
        <Button
          onClick={onOpen}
          colorScheme={'yellow'}
          width="12"
          height={'12'}
          rounded="full"
          zIndex={'overlay'}
          position={'fixed'}
          top="6"
          left="6"
        >
          <RiMenu5Fill />
        </Button>
  
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay  backdropFilter={"blur(4px)"}/>
          <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>nav</DrawerHeader>
          <DrawerBody>
          <VStack spacing={'4'} alignItems="flex-start">
          
          {isAuthenticated ? (
                    <> 
                     <HStack>
                          <Link onClick={onClose} to="/home">
                            <Button variant={'ghost'} colorScheme={'yellow'}>
                              Home
                            </Button>
                          </Link>
                         
                         
                        </HStack>

                    <LinkButton onClose={onClose} url="/insert" title="Insert" /> <Link onClick={onClose} to="/data">
                    <Button variant={'ghost'} colorScheme={'yellow'}>
                      This Month Data
                    </Button>
                  </Link>
                  <Link onClick={onClose} to="/show">
                    <Button variant={'ghost'} colorScheme={'yellow'}>
                      All Data
                    </Button>
                  </Link>
                  <Link onClick={onClose} to="/create_user">
                    <Button variant={'ghost'} colorScheme={'yellow'}>
                     create_user
                    </Button>
                  </Link>
                  <Link onClick={onClose} to="/show_user">
                    <Button variant={'ghost'} colorScheme={'yellow'}>
                     show_user
                    </Button>
                  </Link>

                    </> ) :( 
                      <>
                        
                      <LinkButton onClose={onClose} url="/login" title="Login" />
              <LinkButton
                onClose={onClose}
                url="/insert"
                title="Insrt the Data"
              />
              
                      </>  
  )}
        
  
                <HStack
                  justifyContent={'space-evenly'}
                  position="absolute"
                  bottom={'2rem'}
                  width="80%"
                >
  {isAuthenticated ? (
                    <>
                      <VStack>
                       
                        <HStack>
                        <Link onClick={onClose} to="/logout">
                        <Button  onClick={LogoutHander}  colorScheme={'yellow'}>Logout</Button>
                      </Link>
                        </HStack>
                        
                      </VStack>
                    </>
                  ) : (
                    <>
                      <Link onClick={onClose} to="/login">
                        <Button colorScheme={'yellow'}>Login</Button>
                      </Link>
  
                   
                    </>
                  )}
  
                </HStack>
          </VStack>
  
  
  
          </DrawerBody>
  
          </DrawerContent>
  
  
  
        </Drawer>
  
  
  
      </>
    );
  };
  
  export default Header;
  
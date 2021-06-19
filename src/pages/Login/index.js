import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { CodeButton } from "../../components";
import useNotification from "../../hooks/useNotification";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useNotification();
  const history = useHistory();

  const handleLogin = () => {
    try {
      toast.success("Success!", "Login");
    } catch (error) {
      toast.error(`Oops... Error occurred..\n ${error}`);
    }
  };

  return (
    <Center height="100vh" width="100%">
      <Box
        border="1px solid"
        borderColor="primary.100"
        borderRadius="5px"
        w="500px"
        p="20px"
        m="0 auto"
      >
        <Center>
          <Text fontSize="24px" mb="15px" color="text.100">
            Login
          </Text>
        </Center>

        <InputGroup size="md" mb="15px">
          <Input placeholder="email" size="md" mb="15px" color="text.100" />
        </InputGroup>
        <InputGroup size="md" mb="15px">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            color="text.100"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Flex justifyContent="space-between">
          <Button
            variant="ghost"
            onClick={() => history.push("/forgot-password")}
          >
            Forggot Password
          </Button>
          <CodeButton width="100px" onClick={handleLogin}>
            Login
          </CodeButton>
        </Flex>

        <Center mt="20px">
          <Button variant="ghost" onClick={() => history.push("/create-user")}>
            Have account? Create a new Account
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Login;

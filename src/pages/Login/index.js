import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CodeButton } from "../../components";
import useApp from "../../hooks/useApp";
import useNotification from "../../hooks/useNotification";
import api from "../../services/api";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [login, setLogin] = useState({
    email: null,
    password: null,
  });

  const toast = useNotification();
  const history = useHistory();

  const appData = useApp();

  const handleLogin = async () => {
    try {
      if (!login.email) {
        toast.warning("Email is required", "Oops..");
        return;
      }

      if (!login.password) {
        toast.warning("Password is required", "Oops..");
        return;
      }

      let status = 0;

      const responseApi = await api.post("/sessions", login).catch((err) => {
        if (err.response.status === 400) {
          status = 400;
          toast.warning(err.response.data.message, "Oops..");
        }
      });

      if (!responseApi && status === 400) {
        return;
      }

      if (responseApi.status === 200) {
        toast.success("Login Success");
        appData.setAppData(responseApi.data);

        history.push("/doctor-profile");
      }
    } catch (error) {
      toast.error(`${error}`, "Oops... Error occurred..");
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
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={1}>
            <IconButton
              variant="ghost"
              icon={
                <ArrowBackIcon
                  boxSize={6}
                  onClick={() => history.push("/home")}
                />
              }
            />
          </GridItem>

          <GridItem colSpan={2}>
            <Text fontSize="24px" mb="15px" color="text.100">
              Login
            </Text>
          </GridItem>
        </Grid>

        <InputGroup size="md" mb="15px">
          <Input
            placeholder="email"
            size="md"
            mb="15px"
            color="text.100"
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup size="md" mb="15px">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            color="text.100"
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
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

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CodeButton } from "../../components";
import useNotification from "../../hooks/useNotification";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

const CreateUser = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [newUser, setNewUser] = useState({});

  const toast = useNotification();
  const history = useHistory();

  const handleSave = async () => {
    try {
      if (!newUser.name) {
        toast.warning("Name is required", "Oops..");
        return;
      }

      if (!newUser.email) {
        toast.warning("Email is required", "Oops..");
        return;
      }

      if (!newUser.password) {
        toast.warning("Password is required", "Oops..");
        return;
      }

      if (newUser.password && newUser.password.length < 6) {
        toast.warning("Enter a password with at least 6 characters", "Oops..");
        return;
      }

      if (!newUser.confirmPassword) {
        toast.warning("Confirm password is required", "Oops..");
        return;
      }

      if (newUser.confirmPassword && newUser.confirmPassword.length < 6) {
        toast.warning(
          "Enter a confirm password with at least 6 characters",
          "Oops..",
        );
        return;
      }

      if (newUser.password !== newUser.confirmPassword) {
        toast.warning("Password don't  match", "Oops..");
        return;
      }

      if (!newUser.telefone) {
        toast.warning("Telefone is required", "Oops..");
        return;
      }

      let status = 0;

      const responseApi = await api.post("/users", newUser).catch((err) => {
        if (err.response.status === 400) {
          status = 400;
          toast.warning(err.response.data.message, "Oops..");
        }
      });

      if (!responseApi && status === 400) {
        return;
      }

      if (responseApi.status === 201) {
        toast.success("User created!", "Success");
        history.push("/login");
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
          <Box>
            <IconButton
              variant="ghost"
              icon={
                <ArrowBackIcon boxSize={6} onClick={() => history.goBack()} />
              }
            />
          </Box>
          <Box>
            <Text fontSize="24px" mb="15px" color="text.100">
              Create User
            </Text>
          </Box>
        </Grid>

        <Center>
          <Stack mb="15px">
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
            />
          </Stack>
        </Center>

        <InputGroup size="md" mb="15px">
          <Input
            placeholder="name"
            size="md"
            color="text.100"
            onChange={(e) => {
              setNewUser({ ...newUser, name: e.target.value });
            }}
          />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input
            placeholder="email"
            size="md"
            color="text.100"
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value });
            }}
          />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input
            type={show ? "text" : "password"}
            placeholder="password"
            color="text.100"
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input
            type={show ? "text" : "password"}
            placeholder="confirm password"
            color="text.100"
            onChange={(e) => {
              setNewUser({ ...newUser, confirmPassword: e.target.value });
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input
            placeholder="telefone"
            size="md"
            color="text.100"
            onChange={(e) => {
              setNewUser({ ...newUser, telefone: e.target.value });
            }}
          />
        </InputGroup>

        <Flex justifyContent="flex-end">
          <CodeButton width="100px" onClick={handleSave}>
            Save
          </CodeButton>
        </Flex>
      </Box>
    </Center>
  );
};

export default CreateUser;

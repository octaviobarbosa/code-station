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
import React from "react";
import { CodeButton } from "../../components";
import useNotification from "../../hooks/useNotification";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

const CreateUser = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useNotification();
  const history = useHistory();

  const handleSave = () => {
    try {
      toast.success("User created!", "Success");
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
          <Input placeholder="name" size="md" color="text.100" />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input placeholder="email" size="md" color="text.100" />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input
            type={show ? "text" : "password"}
            placeholder="password"
            color="text.100"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input placeholder="telefone" size="md" color="text.100" />
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

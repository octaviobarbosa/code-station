import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { CodeButton } from "../../components";
import useNotification from "../../hooks/useNotification";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const toast = useNotification();
  const history = useHistory();

  const handleConfirm = () => {
    try {
      toast.success("Email Send.", "Success");
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
          <GridItem colSpan={1}>
            <IconButton
              variant="ghost"
              icon={
                <ArrowBackIcon boxSize={6} onClick={() => history.goBack()} />
              }
            />
          </GridItem>

          <GridItem colSpan={2}>
            <Text fontSize="24px" mb="15px" color="text.100">
              Forgot Pasword
            </Text>
          </GridItem>
        </Grid>

        <InputGroup size="md" mb="15px">
          <Input placeholder="email" size="md" color="text.100" />
        </InputGroup>

        <Flex justifyContent="flex-end">
          <CodeButton width="100px" onClick={handleConfirm}>
            Confirm
          </CodeButton>
        </Flex>
      </Box>
    </Center>
  );
};

export default ForgotPassword;

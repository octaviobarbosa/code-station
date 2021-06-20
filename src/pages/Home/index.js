import { Avatar, Box, Center, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import useApp from "../../hooks/useApp";
import useNotification from "../../hooks/useNotification";
import api from "../../services/api";
import CardDoctor from "./components/CardDoctor";

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  const appData = useApp();
  const toast = useNotification();
  const history = useHistory();

  const { user } = appData.getAppData();

  const getDoctors = useCallback(async () => {
    try {
      const responseApi = await api.get("/doctors");

      if (responseApi.status === 200) {
        setDoctors(responseApi.data);
      }
    } catch (error) {
      toast.error(error, "Error");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  return (
    <Box>
      <Box
        as="header"
        w="1100px"
        bg="primary.100"
        h="50px"
        justifyItems="center"
        alignItems="center"
      >
        <Flex justifyContent="flex-end">
          <Flex h="50px" w="50px" justifyContent="center" alignItems="center">
            <Stack>
              <Avatar
                size="sm"
                name={user.name}
                // src="https://bit.ly/sage-adebayo"
                cursor="pointer"
                onClick={() => history.push(`/doctor-profile`)}
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Box as="main" w="1100px" pt="15px">
        <Text fontWeight={500} pb="15px">
          Lista de médicos
        </Text>

        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {doctors.map((doctor) => (
            <Center>
              <CardDoctor data={doctor} />
            </Center>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

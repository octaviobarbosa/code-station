import {
  Avatar,
  Box,
  Center,
  Grid,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { CodeButton } from "../../components";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { useParams } from "react-router-dom";

const DoctorDetail = (props) => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState({});

  const history = useHistory();

  const getDoctor = useCallback(async () => {
    const responseApi = await api.get(`/doctors/${id}`);

    if (responseApi.status === 200) {
      setDoctor(responseApi.data);
    }
  }, [id]);

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

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
              Doctor Detail
            </Text>
          </Box>
        </Grid>

        <Center flexDirection="column">
          <Stack mb="15px">
            <Avatar
              size="2xl"
              name={doctor?.user?.name}
              src={doctor?.user?.avatar}
            />
          </Stack>
          <Text fontSize="24px" mb="15px" color="text.100">
            {doctor?.user?.name}
          </Text>
        </Center>

        <CodeButton>Mensagem Whatsapp</CodeButton>
      </Box>
    </Center>
  );
};

export default DoctorDetail;

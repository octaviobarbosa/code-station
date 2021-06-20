import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { CategorySelect, CodeButton } from "../../components";
import useNotification from "../../hooks/useNotification";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import useApp from "../../hooks/useApp";
import UfSelect from "../../components/UFSelect";

const CreateUser = () => {
  const toast = useNotification();
  const history = useHistory();
  const appData = useApp();

  const { user, token } = appData.getAppData();

  const [doctor, setDoctor] = useState({});

  const getDoctor = useCallback(async () => {
    setDoctor({ user_id: user.id });

    const responseApi = await api.get(`/doctors/${user.id}`);

    if (responseApi.status === 200) {
      setDoctor(responseApi.data);
    }
  }, [user.id]);

  useEffect(() => {
    getDoctor();
  }, [getDoctor]);

  const handleSave = async () => {
    try {
      if (!doctor.crm) {
        toast.warning("Cmr is required", "Oops..");
        return;
      }

      if (!doctor.clinicAdress) {
        toast.warning("Address is required", "Oops..");
        return;
      }

      if (!doctor.uf) {
        toast.warning("UF is required", "Oops..");
        return;
      }

      if (!doctor.availableAgenda) {
        toast.warning("Agenda is required", "Oops..");
        return;
      }

      if (!doctor.category_id) {
        toast.warning("Category is required", "Oops..");
        return;
      }

      let status = 0;

      const responseApi = await api
        .post("/doctors", doctor, {
          headers: { authorization: `Bearer ${token}` },
        })
        .catch((err) => {
          if (err.response.status === 400) {
            status = 400;
            toast.warning(err.response.data.message, "Oops..");
          }
        });

      if (!responseApi && status === 400) {
        return;
      }

      if (responseApi.status === 201) {
        toast.success("Doctor created!", "Success");
        history.push("/home");
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
              Doctor Profile
            </Text>
          </Box>
        </Grid>

        <Center flexDirection="column">
          <Stack mb="15px">
            <Avatar
              size="2xl"
              name={user.name}
              // src="https://bit.ly/sage-adebayo"
            />
          </Stack>
          <Text fontSize="24px" mb="15px" color="text.100">
            {user.name}
          </Text>
        </Center>

        <InputGroup size="md" mb="15px">
          <Input
            placeholder="crm"
            size="md"
            color="text.100"
            onChange={(e) => {
              setDoctor({ ...doctor, crm: e.target.value });
            }}
            value={doctor.crm}
          />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Input
            placeholder="address"
            size="md"
            color="text.100"
            onChange={(e) => {
              setDoctor({ ...doctor, clinicAdress: e.target.value });
            }}
            value={doctor.clinicAdress}
          />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <UfSelect
            onChange={(e) => {
              setDoctor({ ...doctor, uf: e.target.value });
            }}
            value={doctor.uf}
          />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Textarea
            placeholder="bio"
            size="md"
            color="text.100"
            onChange={(e) => {
              setDoctor({ ...doctor, bio: e.target.value });
            }}
            value={doctor.bio}
          />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <Textarea
            placeholder="Agenda"
            size="md"
            color="text.100"
            onChange={(e) => {
              setDoctor({ ...doctor, availableAgenda: e.target.value });
            }}
            value={doctor.availableAgenda}
          />
        </InputGroup>

        <InputGroup size="md" mb="15px">
          <CategorySelect
            onChange={(e) => {
              setDoctor({ ...doctor, category_id: e.target.value });
            }}
            value={doctor.category_id}
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

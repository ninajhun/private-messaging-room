import { Center, Button, Input } from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form";

export default function SetUsername(props) {

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    const { username } = data;
    props.updateUsername(username);
    props.updateAlreadyUsernameSelected(true)
  };
  return (
    <Center h="500px">
        <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="username" placeholder= "Your username" ref={register} mb="10px"></Input>
        <Button type="submit">Submit</Button>
      </form>
    </Center>
   )

}

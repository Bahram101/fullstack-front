import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const res = useSelector((state) => state.auth.data);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  }); 

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if('fullName' in data.payload){
      window.localStorage.setItem('tokenFull', data.payload?.token)
    }
  };

  console.log('res',res)

  if(res?.hasOwnProperty('token')){
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      {res?.hasOwnProperty("mes") ? (
        <div style={{ fontSize: "12px", color: "red", marginBottom: 10 }}>{res.mes}</div>
      ) : (
        res?.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "12px", color: "red" }}>- {item.msg}</div>
          </div>
        ))
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors?.email?.message}
          {...register("email", {
            required: "Заполните поля",
          })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors?.password?.message}
          {...register("password", {
            required: "Заполните поля",
          })}
        />

        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

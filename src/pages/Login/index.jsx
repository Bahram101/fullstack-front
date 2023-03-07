import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const dispatch = useDispatch();
  // const isAuth = useSelector((state) => state.auth.data);
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

  // console.log("isAuth", isAuth);
  console.log("res", res);

  const onSubmit = (values) => {
    dispatch(fetchUserData(values));
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      {res?.hasOwnProperty('mes') ? res.mes :  res?.map((item) => (
        <div style={{marginBottom: '10px'}}>
          <div style={{ fontSize: "12px", color: "red" }}>- {item.msg}</div>
        </div>
      ))}

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

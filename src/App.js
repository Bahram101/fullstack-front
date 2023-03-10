import Container from "@mui/material/Container";
import { useEffect } from "react";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);

  useEffect(()=>{
    dispatch(fetchAuthMe())
  }, [])


  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

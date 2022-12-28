import Header from "./Header";
import Filter from "./Filter";
import ProductList from "./ProductList";
import { useContext } from "react";
import { AuthContext } from "./AuthContet";

const Home = () => {
  const { user_detail } = useContext(AuthContext);
  
 
  return (
    <>
      <Header />
      <Filter />
      {/*<ProductList />*/}
    </>
  );
};

export default Home;

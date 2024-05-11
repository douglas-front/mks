import Card from "@/app/components/Card";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import CardSkelleto from "@/app/components/Card/skeleto/Skelleto";
import { useProducts } from "@/app/hooks/useProducts";
import { Products } from "@/app/types/products";

const Hero = () => {
  //usando o hook para fazer get na api
  const { data, isLoading } = useProducts();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {isLoading ? (
          <CardSkelleto />
        ) : (
          data &&
          data.products.map((product) => (
            <Card
              id={product.id}
              name={product.name}
              photo={product.photo}
              description={product.description}
              price={parseFloat(product.price)}
              key={product.id}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Hero;

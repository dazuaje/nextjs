import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import AddCard from "../src/components/AddCard/AddCard";
import Card from "../src/components/Card/Card";
import RefreshButton from "../src/components/RefreshButton/RefreshButton";

export async function getServerSideProps() {
  const response = await fetch("https://tinyfac.es/api/data?limit=5&quality=0");
  const data = await response.json();
  return { props: { data } };
}

function App({ data }) {
  const [images, setImages] = useState([...data]);
  const [loader, setLoader] = useState(false);

  const getImage = async () => {
    const response = await fetch("https://tinyfac.es/api/users");
    const result = await response.json();
    return result[0];
  };

  const addImage = async () => {
    getImage().then((image) => {
      setImages((prevImage) => [...prevImage, image]);
      setLoader(false);
    });
  };

  const refreshImages = async (index) => {
    getImage().then((image) => {
      const refresh = [...images];
      refresh.splice(index, 1, image);
      setImages(...[refresh]);
      setLoader(false);
    });
  };

  const refreshAllImages = async () => {
    setLoader(true);
    const refreshAll = [...images];
    const refreshAvatars = await Promise.all(refreshAll.map(() => getImage()));
    setImages(refreshAvatars);
    setLoader(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerCard}>
        {images.map((person, index) => {
          return (
            <Card
              key={index.toString()}
              onClick={() => refreshImages(index)}
              src={person.url}
              loader={loader ? loader.toString() : null}
            />
          );
        })}

        <AddCard onClick={addImage}></AddCard>
      </div>

      {images.length ? (
        <RefreshButton onClick={refreshAllImages}> REFRESH ALL </RefreshButton>
      ) : null}
    </div>
  );
}

export default App;
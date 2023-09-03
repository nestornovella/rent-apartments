import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import styles from "../styles/Apartments.module.css";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);

  const fetchApartments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/apartment");
      setApartments(response.data);
      if(response.data.length === 0) {
        return "apartments not found"
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const updateApartmentAvailability = (apartmentId) => {
    setApartments((prevApartments) =>
      prevApartments.map((apartment) =>
        apartment.id === apartmentId
          ? { ...apartment, availability: false }
          : apartment
      )
    );
  };
  
  return (
    <section className={styles.container}>
      {apartments.map((apartment) => (
        <Card
          key={apartment.id}
          id={apartment.id}
          images={apartment.images}
          availability={apartment.availability}
          price={apartment.price}
          ubication={apartment.ubication}
          description={apartment.description}
          bedrooms={apartment.bedrooms} 
          bathrooms={apartment.bathrooms} 
          apartmentNumber={apartment.apartmentNumber} 
          updateApartmentAvailability={updateApartmentAvailability}
        />
      ))}
    </section>
  );
};
export default Apartments;

import { useEffect, useState } from "react";
import useAuth0GetData from "../custom/auth0getinData";
import axios from 'axios'

function useAdminApartments() {
  const [apartments, setApartments] = useState({
    rent: [],
    sale: [],
  });
  const { controledUser } = useAuth0GetData()


  const [pending, setPending] = useState(true)
  const VITE_API_USER_APARTMENT = import.meta.env.VITE_API_USER_APARTMENT
  const VITE_API_APARTMENT_ANOTATIONS = import.meta.env.VITE_API_APARTMENT_ANOTATIONS

  function resetData() {
    if (!pending) { setPending(true) }
    fetch(`${VITE_API_USER_APARTMENT}?anotations=true`)
      .then((response) => response.json())
      .then((data) => {
        const saleList = [...data.data].filter((ap) => ap.status == "sale");
        const rentList = [...data.data].filter((ap) => ap.status == "rent");
        setApartments({ ...apartments, rent: rentList, sale: saleList });
      })
      .finally(() => setPending(false))
  }

  function getAnApartment(apartId) {
    fetch(import.meta.env.VITE_API_USER_APARTMENT + apartId)
      .then(response => response.json())
      .then(response => response.data)
      .catch(err => console.error(err))
  }

  function changeStatusFromAnotations(id, type) {
    ///1/?email=nestornovellafullstackdev@gmail.com
    if (type == 'update') {
      return axios.put(`${VITE_API_APARTMENT_ANOTATIONS + id}/?email=${controledUser.email}`, { status: 'resolved' })
        .then(response => response.data.status < 300 && 'se actualizo correctamente')
        .catch(error => console.error(error))
    } else {
      return axios.delete(`${VITE_API_APARTMENT_ANOTATIONS + id}/?email=${controledUser.email}`)
        .then(response => response.data.status < 300 && 'se actualizo correctamente')
        .catch(error => console.error(error))
    }
  }


  function getApartments() {
    resetData();
  }

  return {
    apartments,
    resetData,
    getApartments,
    pending,
    getAnApartment,
    changeStatusFromAnotations
  };
}

export default useAdminApartments;

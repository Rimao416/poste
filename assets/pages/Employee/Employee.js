import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./employee.css";
import "../../styles/input.css";
import Title from "../../Components/title/Title";
import "../../styles/button.css";
import authApi from "../../services/authApi";
import Modalemployee from "../../Components/modal/Modalemployee";
import TableLoader from "../../Components/loaders/TableLoader";
import axios from "axios";
import { BsFillGrid3X3GapFill, BsFillGrid1X2Fill } from "react-icons/bs";
import UsersCard from "../../Components/UsersCard/UsersCard";
const Employee = () => {
  var i = 1;
  const user = authApi.getUserInfo();
  console.log(user);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [depid, setDepid] = useState(0);
  const [view, setView] = useState("card");
  const [employes, setEmploye] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    noms: "",
    mail: "",
  });

  const fetchEmployes = async () => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/users")
        .then((response) => response.data);
      setEmploye(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchEmployes();
  }, []);
  const handleSearch = (event) => {
    const { value, name } = event.currentTarget;
    setSearch({ ...search, [name]: value });
    console.log(search);
  };
  const filteredEmploye = employes.filter(
    (p) =>
      (p.firstName.toLowerCase().includes(search.noms.toLowerCase()) ||
        p.lastName.toLowerCase().includes(search.noms.toLowerCase())) &&
      p.email.includes(search.mail)
  );

  return (
    <>
      <div className="employee d-flex-4">
        {/** ------------------------- PARTIE DU TITRE -------------------------------------*/}
        <div className="centre">
          <Title nomdepage="Dashboard" subname="Employé">
            <span onClick={() => setView("card")}>
              <BsFillGrid1X2Fill />
            </span>
            <span onClick={() => setView("table")}>
              <BsFillGrid3X3GapFill />
            </span>
            <button>
              <Link to="employee/creation">Ajouter un un Employé</Link>
            </button>
          </Title>

          <div className="header-input">
            <input
              type="text"
              placeholder="ex Omari Kayumba"
              value={search.noms}
              name="noms"
              onChange={handleSearch}
            />
            <input
              type="text"
              placeholder="ex. mariem@gmail.com"
              value={search.mail}
              name="mail"
              onChange={handleSearch}
            />
          </div>
          {!loading && <UsersCard view={view} employes={filteredEmploye} />}
        </div>
        <>{loading && <TableLoader />}</>
      </div>
      <Modalemployee
        isOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        type={type}
        id={depid}
        table={employes}
        setTable={setEmploye}
        setId={setDepid}
      />
    </>
  );
};

export default Employee;

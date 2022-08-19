import React, { useState, useEffect } from "react";
import "./modal.css";
import { createPortal } from "react-dom";
/*import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-initials-sprites";*/
import departementApi from "../../services/departementApi";
import postApi from "../../services/postApi";
import employeApi from "../../services/employeApi";
import moment from "moment";
import { BiX } from "react-icons/bi";
import Ajouteremploye from "../forms/Ajouteremploye";
import Supprimeremploye from "../forms/Supprimeremploye";
import { toast } from "react-toastify";
const Modalemployee = ({
  isOpened,
  onClose,
  table,
  setTable,
  id,
  type,
  setType,
  setId,
}) => {
  console.log(type);
  const fetchUser = async (monid) => {
    try {
      const response = await employeApi.find(monid);
      console.log(response);
      const { id, adresse, comeAt, email, firstName, lastName } = response;
      setUser({
        id,
        adresse,
        comeAt: moment(comeAt).format("YYYY-MM-DD"),
        email,
        firstName,
        lastName,
      });
    } catch (error) {
      console.log("Erreur");
    }
  };
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    photo: "",
    adresse: "",
    comeAt: "",
    poste: "",
    Departement: "",
  });

  // console.log("L'id est"+ id);
  const [departements, setDepartements] = useState([]);
  const [postes, setPostes] = useState([]);
  const fetchDepartements = async () => {
    try {
      const data = await departementApi.findAll();
      setDepartements(data);
      console.log(data);

      // if(!user.Departement)setUser({...user,Departement:data[0].id})
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchDepartements();
  }, []);
  useEffect(() => {
    if (id != 0) {
      fetchUser(id);
    }
  }, [id]);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    adresse: "",
    comeAt: "",
    Departement: "",
  });
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    //    setUser({ ...user, [name]: value });
    setUser({
      ...user,
      [name]: value,
      photo: `https://avatars.dicebear.com/api/initials/${
        user.firstName + " " + user.lastName
      }.svg`,
    });
  };
  const handleChoose = async (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    console.log(value);
    if (value != 0) {
      const response = await postApi.findOneById(value);
      console.log(response);
      setPostes(response);
    } else {
      setPostes([]);
    }
  };

  const handleSubmit = async (event) => {
    /*    document.querySelector(".card_user").classList.remove("active");
    document.querySelector(".operations_users").classList.remove("hide");*/
    event.preventDefault();
    if (user.poste == undefined) {
      toast.error("Vous devez séléctionner un poste");
    }
    const apiError = {};
    if (id == 0) {
      if (user.password !== user.passwordConfirm) {
        apiError.passwordConfirm =
          "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
        setErrors(apiError);
        return;
      } else {
        apiError.passwordConfirm = "";
      }
    }
    try {
      /*******************************************************************************************PARTIE AJOUT************************************************* */
      if (id == 0) {
        const response = await employeApi.create(
          user.email,
          user.password,
          user.firstName,
          user.lastName,
          user.photo,
          user.adresse,
          user.comeAt,
          user.poste
        );
        setErrors({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          adresse: "",
          comeAt: "",
        });

        const {
          id,
          adresse,
          comeAt,
          email,
          firstName,
          lastName,
          photo,
          poste,
        } = response.data;

        console.log(response);
        var Designation = poste.Designation;
        table.push({
          id,
          adresse,
          comeAt,
          email,
          firstName,
          lastName,
          photo,
          poste: {
            Designation,
          },
        });
        setTable(table);
        // setUser({
        //   adresse: "",
        //   comeAt: "",
        //   email: "",
        //   firstName: "",
        //   lastName: "",
        // });
        setId(0);

        if (response.status == 201) {
          toast.success("Utilisateur ajouté avec Succès");
          onClose();
        }
        /*******************************************************************************************PARTIE MODIFICATION************************************************* */
      } else if (id != 0 && type == "AJOUTER_EMPLOYE") {
        const response = await employeApi.update(
          id,
          user.email,
          user.firstName,
          user.lastName,
          user.adresse,
          user.poste
        );
        // setUser({
        //   adresse: "",
        //   comeAt: "",
        //   email: "",
        //   firstName: "",
        //   lastName: "",
        // });
        table.map((t) => {
          if (t.id == id) {
            t.firstName = user.firstName;
            t.lastName = user.lastName;
            t.adresse = user.adresse;
            t.poste.Designation = response.data.poste.Designation;
            t.photo = user.photo;
          }
        });
      }
      setUser({
        adresse: "",
        comeAt: "",
        email: "",
        firstName: "",
        lastName: "",
      });
      onClose();
      setId(0);
    } catch (error) {
      // if(error.response.status==400){
      //   apiError.Departement="Indiquer un département"
      //   setErrors(apiError)
      //   console.log("Salut")
      // }
      //      console.log(error.response)
      error.response.data.violations.forEach((violation) => {
        apiError[violation.propertyPath] = violation.message;
      });

      console.log(error);
      setErrors(apiError);
      toast.error("Veuillez remplir tous les champs");
    }
    if (Object.keys(apiError).length == 0) {
      onClose();
      setErrors({
        email: "",
        firstName: "",
        lastName: "",
        adresse: "",
        photo: "",
        comeAt: "",
      });
    }
    setId(0);
    onClose();
  };
  /***************************************************************************************PARTIE SUPPRESSION ***************************************************** */
  const onRemove = async (event) => {
    console.log("L'id de suppression est " + id);
    try {
      const response = await employeApi.delete(id);
      setTable(table.filter((t) => t.id != id));
    } catch (error) {
      console.log(error);
      toast.info(
        "Erreur de la suppression, cet utilisateur a un contrat avec l'entreprise"
      );
    }
    onClose();
  };
  /****************************************************************************************FIN SUPPRESSION DELETE**************************************************** */
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setId(0);
              setUser({
                id: "",
                adresse: "",
                firstName: "",
                lastName: "",
                comeAt: "",
              });
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">
            {id > 0 ? "Modifier un Employé" : "Ajouter un employé"}
          </h5>
        </div>
        <div className="modal-body">
          {type == "AJOUTER_EMPLOYE" ? (
            <Ajouteremploye
              handleSubmit={handleSubmit}
              errors={errors}
              user={user}
              handleChange={handleChange}
              id={id}
              departements={departements}
              handleChoose={handleChoose}
              postes={postes}
            />
          ) : (
            <>
              <Supprimeremploye
                onClose={onClose}
                setUser={setUser}
                onRemove={onRemove}
              />
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default Modalemployee;

import React, { useState, useEffect } from "react";
import "./modal.css";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";


import { toast } from "react-toastify";
import InfoEmploye from "../forms/InfoEmploye";
import axios from "axios";
import { EMPLOYES_API, CONTRATS_USER_API } from "../../config";
import InfoPersoEmploye from "../forms/InfoPersoEmploye";
import InfoPosteEmploye from "../forms/InfoPosteEmploye";
import InfoContratEmploye from "../forms/InfoContratEmploye";
const ModalOperationEmployee = ({
  isOpened,
  onClose,
  user,
  setUser,
  type,
  setType,
  contrat,
  setContrat,
  contratId,
  setContratId,
  profile_idUser
}) => {
  const [utilisateur, setUtilisateur] = useState({
    email: "",
    firstName: "",
    lastName: "",
    adresse: "",
    dateNaissance: "",
    telephone: "",
  });

  if (!isOpened) {
    return null;
  }
  const handleChange = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setUtilisateur({ ...utilisateur, [name]: value });
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(utilisateur);
    console.log(user);
    try {
      if (type == "HEADER_INFO") {
        await axios.put(EMPLOYES_API + "/" + user.id, {
          firstName: user.firstName,
          lastName: user.lastName,
          telephone: user.telephone,
          dateNaissance: user.dateNaissance,
          email: user.email,
          adresse: user.adresse,
        });
        toast.success("Information modifiée avec succèes");
      } else if (type == "INFO_PERSO") {
        await axios.put(EMPLOYES_API + "/" + user.id, {
          cin: user.cin,
          matricule: user.matricule,
          statut: user.statut,
          pays: user.pays,
          sexe: user.sexe,
          enfant: user.enfant,
        });
        toast.success("Information modifiée avec succèes");
      } //else if (type == "CONTRAT_INFO") {
      //   const data = await axios
      //     .post(CONTRATS_USER_API, {
      //       type: `api/type_contrats/${contrat.type}`,
      //       DateDebut: contrat.DateDebut,
      //       DateFin: contrat.DateFin,
      //       user:`api/users/${user.id}`
      //     })
      //     .then((response) => response.data.type);
      //   console.log(data);
      //   setContrat({ ...contrat, ["type"]: data.nom });
      // }
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la modification");
    }
  };
  function returnForm(
    chaine,
    submitFunction,
    changeFunction,
    userFunction,
    setUserFunction,
    contratValue,
    setContratValue,
    yourContratId,
    setYourContratId
  ) {
    if (chaine == "HEADER_INFO") {
      return (
        <InfoEmploye
          handleSubmit={submitFunction}
          user={userFunction}
          handleChange={changeFunction}
        />
      );
    } else if (chaine == "INFO_PERSO") {
      return (
        <InfoPersoEmploye
          handleSubmit={submitFunction}
          user={userFunction}
          handleChange={changeFunction}
        />
      );
    } else if (chaine == "POSTE_INFO") {
      return (
        <InfoPosteEmploye
          handleSubmit={submitFunction}
          user={userFunction}
          handleChange={changeFunction}
          setUser={setUserFunction}
        />
      );
    } else if (chaine == "CONTRAT_INFO") {
      return (
        <InfoContratEmploye
          user={userFunction}
          setUser={setUser}
          contrat={contratValue}
          setContrat={setContratValue}
          contratId={yourContratId}
          setContratId={setYourContratId}
        />
      );
    }
  }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setType("");
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">Modifier un employé</h5>
        </div>
        <div className="modal-body">
          {returnForm(
            type,
            handleSubmit,
            handleChange,
            user,
            setUser,
            contrat,
            setContrat,
            contratId,
            setContratId

          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default ModalOperationEmployee;

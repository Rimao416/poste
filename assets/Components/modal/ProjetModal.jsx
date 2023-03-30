import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import AjouterDemande from "../form/AjouterDemande";
import SupprimerDemande from "../form/SupprimerDemande";
import AjouterProjet from "../form/AjouterProjet";
import projetApi from "../../services/projetApi";

function ProjetModal({
  isOpened,
  onClose,
  Type,
  id,
  tables,
  setTables,
  setDepid,
  users,
}) {
  const [typeConge, setTypeConge] = useState("");

  const [image, setName] = useState("");
  const [projet, setProjet] = useState({
    nom: "",
    dateDebut: "",
    dateSoumission: "",
    employe: "",
    statut: "EN ATTENTE",
  });

  //   const fetchModal = async (id) => {
  //     try {
  //       const data = await axios
  //         .get("http://localhost:8000/api/conges/" + id)
  //         .then((response) => response.data);
  //       console.log(data);
  //       setConge({
  //         debutConge: moment(data.debutConge).format("YYYY-MM-DD"),
  //         finConge: moment(data.finConge).format("YYYY-MM-DD"),
  //         raison: data.raison,
  //         explication: data.explication,
  //         statut: data.statut,
  //       });
  //       console.log(data);
  //     } catch (error) {
  //       // console.log(error.response);
  //       toast.error("Erreur lors du chargement, veuillez recommencer");
  //     }
  //   };
  //   useEffect(() => {
  //     if (id != 0) {
  //       fetchModal(id);
  //     }
  //   }, [id]);

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setProjet({ ...projet, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(projet);
    try {
      const data = await projetApi.create(
        projet.nom,
        projet.dateDebut,
        projet.dateSoumission,
        projet.employe
      );
      toast.success("Ajout reussi")
      window.location.reload()
    } catch (error) {
        console.log(error);
      toast.error("Erreur lors de l'ajout");
    }

    toast.info("Envoie en cours");
  };
  //   const onRemove = async (event) => {
  //     try {
  //       const response = await axios.delete(
  //         "http://localhost:8000/api/conges/" + id
  //       );
  //       setTables(tables.filter((table) => table.id != id));
  //       setConge({
  //         debutConge: "",
  //         finConge: "",
  //         raison: "",
  //         explication: "",
  //       });
  //       // setPoste({ designation: "" });
  //       setDepid(0);
  //       onClose();
  //       toast.success("Suppression avec Succès");
  //     } catch (error) {
  //       console.log("erreur");
  //     }
  //   };

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
              setDepid(0);
              setProjet({
                nom: "",
                dateDebut: "",
                dateSoumission: "",
                employe: "",
                statut: "EN ATTENTE",
              });
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            Assignation de projet {id != 0 && "(Modification)"}
          </h5>
        </div>
        <div className="modal-body">
          <AjouterProjet
            handleSubmit={handleSubmit}
            projet={projet}
            handleChange={handleChange}
            id={id}
            users={users}
          />
          {/* {Type == "AJOUTER_DEMANDE" ? (
            <AjouterDemande
              handleSubmit={handleSubmit}
              conge={conge}
              handleChange={handleChange}
              typeConge={typeConge}
              id={id}
            />
          ) : (
              <SupprimerDemande onClose={onClose} onRemove={onRemove} />
          )} */}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ProjetModal;

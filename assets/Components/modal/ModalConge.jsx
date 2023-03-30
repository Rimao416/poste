import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios"
import moment from "moment";
import AjouterDemande from "../form/AjouterDemande";
import SupprimerDemande from "../form/SupprimerDemande";

function ModalConge({
  isOpened,
  onClose,
  Type,
  id,
  tables,
  setTables,
  setDepid,
}) {
  const [typeConge, setTypeConge] = useState("");

  const [image, setName] = useState("");
  const [conge, setConge] = useState({
    debutConge: "",
    finConge: "",
    raison: "",
    explication:"",
    statut: "EN ATTENTE",
  });

  const fetchModal = async (id) => {
    try {
      const data = await axios
        .get("http://localhost:8000/api/conges/" + id)
        .then((response) => response.data);
        console.log(data);
      setConge({
        debutConge: moment(data.debutConge).format("YYYY-MM-DD"),
        finConge: moment(data.finConge).format("YYYY-MM-DD"),
        raison: data.raison,
        explication: data.explication,
        statut:data.statut
      });
      console.log(data);
    } catch (error) {
      // console.log(error.response);
      toast.error("Erreur lors du chargement, veuillez recommencer");
    }
  };
  useEffect(() => {
    if (id != 0) {
      fetchModal(id);
    }
  }, [id]);



  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setConge({ ...conge, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.info("Envoie en cours")
    try {
      if (id != 0) {
        const response = await axios.put(
          "http://localhost:8000/api/conges/" + id,
          conge
        );
        setConge({
          debutConge: "",
          finConge: "",
          raison: "",
          explication:""
        });
        tables.map((t) => {
          if (t.id == id) {
            t.debutConge = response.data.debutConge;
            t.finConge = response.data.finConge;
            t.raison = response.data.raison;
            t.explication=response.data.explication
          }
        });

        setDepid(0);
        onClose();
        toast.info("Modification effectuée avec Succès");
      } else {
        console.log(conge);

        const data = await axios
          .post("http://localhost:8000/api/conges", conge)
          .then((response) => response.data);
        tables.push({
          debutConge: conge.debutConge,
          finConge: conge.finConge,
          raison: data.raison,
          explication:data.explication,
          statut: "EN ATTENTE",
        });
        setConge({
          debutConge: "",
          finConge: "",
          raison: "",
          explication:""
        });
        setDepid(0);
        toast.success(
          "Demande de congé en attente, vous recevrez une réponse d'ici peu"
        );
        onClose();
      }
    } catch (error) {
      // toast.error("Erreur lors de la demande de congé");
      //   console.log(error.response);
    }
  };
  const onRemove = async (event) => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/conges/" + id
      );
      setTables(tables.filter((table) => table.id != id));
      setConge({
        debutConge: "",
        finConge: "",
        raison: "",
        explication:""
      });
      // setPoste({ designation: "" });
      setDepid(0);
      onClose();
      toast.success("Suppression avec Succès");
    } catch (error) {
      console.log("erreur");
    }
  };

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
              setConge({
                debutConge: "",
                finConge: "",
                raison: "",
                explication:""
              });
            }}
          />
        </span>
        <div className="modal-header">
          <h5 className="modal-title">
            Demande de congé {id != 0 && "(Modification)"}
          </h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_DEMANDE" ? (
            <AjouterDemande
              handleSubmit={handleSubmit}
              conge={conge}
              handleChange={handleChange}
              typeConge={typeConge}
              id={id}
            />
          ) : (
              <SupprimerDemande onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ModalConge;

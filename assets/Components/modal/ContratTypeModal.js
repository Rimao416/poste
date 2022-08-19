import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import contratTypeApi from "../../services/contratTypeApi";
import AjouterTypeContrat from "../forms/AjouterTypeContrat";
import SupprimerType from "./SupprimerType";
const ContratTypeModal = ({
  isOpened,
  onClose,
  Type,
  id,
  tables,
  setTables,
  setDepid,
}) => {
  const [title, setTitle] = useState("Ajouter un type de Contrat");
  const [errors, setError] = useState({
    nom: "",
  });
  const [contrat, setContrat] = useState({
    nom: "",
  });
  useEffect(() => {
    if (Type == "AJOUTER_TYPE" && id == 0) {
      setTitle("Ajouter un Type");
    } else if (Type == "AJOUTER_TYPE" && id != 0) {
      setTitle("Modifier un type");
      const filter_tables = tables.filter((t) => t.id === id);
      //   console.log(filter_tables[0].nom);
      setContrat({ nom: filter_tables[0].nom });
    }
  }, [id]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.info("En attente");
    try {
      console.log(contrat);
      if (id != 0) {
        await contratTypeApi.update(id, contrat);
        toast.info("Le Contrat a été modifié");
        tables.map((t) => {
          if (t.id == id) {
            t.nom = contrat.nom;
          }
        });
      } else if (id == 0) {
        const reponse = await contratTypeApi.create(contrat);
        const { id, nom } = reponse.data;
        tables.push({ id, nom });
        console.log(reponse);
        toast.success("Informations ajoutées avec Succès");
      }
    } catch (err) {
      toast.error("Erreur d'ajout");
    }
    setDepid(0);
    setContrat({ nom: "" });
    onClose();
    // console.log("Salut les gars");
  };

  const handleChange = (event) => {
    const { value, name } = event.currentTarget;
    setContrat({ ...contrat, [name]: value });
  };
  if (!isOpened) {
    return null;
  }
  const onRemove = async (event) => {
    try {
      await contratTypeApi.delete(id);
      toast.success("La suppression est un succès");
      setTables(tables.filter((table) => table.id != id));
    } catch (error) {
      toast.warning(
        "Erreur de suppression: Plusieurs employés peuvent être associés à ce contrat"
      );
    }
    onClose();
    setDepid(0);
    setDepartement({ Nom: "" });
  };

  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX
            onClick={() => {
              onClose();
              setDepid(0);
              setContrat({ nom: "" });
              // setDepartement({ Nom: "" });
            }}
          />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
        </div>
        <div className="modal-body">
          {Type == "AJOUTER_TYPE" ? (
            <AjouterTypeContrat
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              errors={errors}
              contrat={contrat}
              id={id}
            />
          ) : (
            <SupprimerType onClose={onClose} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
export default ContratTypeModal;

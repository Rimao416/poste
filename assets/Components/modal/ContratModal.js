import React, { useState, useEffect } from "react";
import { BiX } from "react-icons/bi";
import Select from "../forms/Select";
import { createPortal } from "react-dom";
import contratApi from "../../services/contratApi";
import axios from "axios";
import { CONTRATS_USER_API, SALAIRES_API } from "../../config";
import { toast } from "react-toastify";
import ContratForm from "../forms/ContratForm";
import employeApi from "../../services/employeApi";
const ContratModal = ({ isOpened, onClose, type, contrats, id }) => {
  const [types, setTypes] = useState([]);
  const [uniqueContrat, setUuniqueContrat] = useState([]);
  const [contrat, setContrat] = useState({
    DateDebut: "",
    DateFin: "",
    type: "",
    salaire: "",
  });

  const fetchTypes = async () => {
    const data = await contratApi.findAll();
    setTypes(data);
    console.log(data);
    // data.map((d))
  };
  useEffect(() => {
    console.log(id);
    if (id !== 0) {
      let initialState = contrats.filter((moncontrat) => moncontrat.id == id);
      setUuniqueContrat(initialState);
    }
  }, [id]);
  useEffect(() => {
    fetchTypes();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setContrat({ ...contrat, [name]: value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    toast.info("En attente");
    console.log(contrat);
    console.log(uniqueContrat);
    // METTRE MA BELLE REQUETE AXIOS
    try {
      if (type == "CONTRAT_TYPE") {
        const response_data = await employeApi
          .addUserContrat(
            contrat.type,
            contrat.DateDebut,
            contrat.DateFin,
            uniqueContrat[0].user.id
          )
          .then((response) => response.data.id);
        console.log(contrat);
        console.log(response_data);
        await axios.post(SALAIRES_API, {
          montant: parseFloat(contrat.salaire),
          contrat: `api/contrats/${response_data}`,
        });
        // await axios.post(SALAIRES_API, {
        //   montant: parseFloat(contrat.salaire),
        //   contrat: `api/contrats/${response_data}`,
        // });

        toast.success("Modification effectuée avec succès");

        contrats.map((c, idx) => {
          if (c.id == id) {
            console.log(c)
            c.DateDebut = contrat.DateDebut;
            c.DateFin = contrat.DateFin === "" ? undefined : contrat.DateFin;
            c.salaires.map((s, idx) => {
              if (c.salaires.length - 1 === idx) {
                s.montant = contrat.salaire;
              }
            });
            c.id = response_data;
          }
        });
      } else {
        const salaire_data = await axios.post(SALAIRES_API, {
          montant: parseFloat(contrat.salaire),
          contrat: `api/contrats/${contrats[0].id}`,
        });
        contrats.map((c, idx) => {
          if (c.id == id) {
            c.salaires.map((s, idx) => {
              if (c.salaires.length - 1 === idx) {
                s.montant = contrat.salaire;
              }
            });
          }
        });
      }
      toast.success("Salaire ajustée avec succès");
      onClose();
    } catch (error) {
      toast.info("ERREUR LORS DE L'ajout");
    }
  };
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="overlay">
      <div className="modal">
        <span id="cross">
          <BiX onClick={() => onClose()} />
        </span>

        <div className="modal-header">
          <h5 className="modal-title">
            {type === "CONTRAT_TYPE"
              ? "RENOUVELLEMENT DU CONTRAT"
              : "AJUSTEMENT DU SALAIRE"}
          </h5>
        </div>
        <div className="modal-body">
          {type === "CONTRAT_TYPE" ? (
            <ContratForm
              submitHandler={submitHandler}
              handleChange={handleChange}
              types={types}
            />
          ) : (
            <form className="formulaire" onSubmit={submitHandler}>
              <div className="form-grap">
                <div className="form-group">
                  <label htmlFor="date de fin" className="label-input">
                    Salaire
                  </label>
                  <input
                    type="text"
                    name="salaire"
                    onChange={handleChange}
                    required
                  />
                  <p> </p>
                </div>
              </div>
              <div className="submit-section">
                <button className="form-first " type="submit">
                  ENREGISTRER
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ContratModal;

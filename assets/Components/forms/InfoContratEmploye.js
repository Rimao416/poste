import React, { useState, useEffect } from "react";
import Select from "./Select";
import moment from "moment";
import contratApi from "../../services/contratApi";
export default function InfoContratEmploye({
  user,
  setUser,
  contrat,
  setContrat,
  contratId,
  setContratId,
}) {
  const [uniqueContrat, setUniqueContrat] = useState({
    DateDebut:"",
    DateFin:"",
    type:"",
    user:""
  });
  useEffect(() => {
    const contrat_filter=contrat.filter((c)=>(
      c.id===contratId
    ))
    console.log(contrat_filter)
    setUniqueContrat({DateDebut:contrat_filter[0].DateDebut,DateFin:contrat_filter[0].DateFin,
    type:contrat_filter[0].type.nom
    })
  },[]);

  const [type, setType] = useState([]);
  const fetchTypes = async () => {
    try {
      const data = await contratApi.findAll();
      setType(data);
      console.log(data);

      // if(!user.Departement)setUser({...user,Departement:data[0].id})
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchTypes();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setContrat({ ...uniqueContrat, [name]: value });
  };
  const handleSubmitContrat = (event) => {
    event.preventDefault();
    console.log(uniqueContrat);
  };
  return (
    <>
      <form className="formulaire" onSubmit={handleSubmitContrat}>
        <div className="form-grap">
          <div className="form-group">
            <Select
              name="type"
              label="Choisir un   le type"
              onChange={handleChange}
            >
              <option value="">--------------------------------</option>
              {type.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nom}
                </option>
              ))}
            </Select>
            <p>Valeur actuelle:{uniqueContrat.type}</p>
          </div>
          <div className="form-group">
            <label htmlFor="">Date de Début</label>
            <input type="date" name="DateDebut" onChange={handleChange} />
            <p>
              Date actuelle:{moment(uniqueContrat.DateDebut).format("DD-MM-YYYY")}
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="">Date de Fin</label>
            <input type="date" name="DateFin" onChange={handleChange} />
            <p>Date actuelle:{moment(uniqueContrat.DateFin).format("DD-MM-YYYY")}</p>
          </div>
          <div className="form-group">
            <label htmlFor="">Salaire</label>
            <input type="number" name="salaire" onChange={handleChange} />
            {/* <p>
              Date actuelle:{moment(contrat.DateFin).format("DD-MM-YYYY")}
            </p> */}
          </div>
        </div>

        <div className="submit-section">
          <button className="form-first " type="submit">
            Modifier
          </button>
        </div>
      </form>
    </>
  );
}

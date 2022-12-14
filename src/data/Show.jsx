import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../components/Firebase/Firebase";

/* Estilos de alertas y botones */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Show = () => {
  //1- configurammos los hooks
  const [articles, setArticles] = useState([]);

  //2- referenciamos a la DB firestore
  const articlesCollection = collection(db, "articulos");

  //3- funcion para mostrar todos los docs
  const getArticles = async () => {
    const data = await getDocs(articlesCollection);
    //console.log(data.docs);
    setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(articles);
  };

  //4- funcion para eliminar un doc
  const deleteArticle = async (id) => {
    const article = doc(db, "articulos", id);
    await deleteDoc(article);
    getArticles();
  };

  //5- funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Eliminar el articulo?",
      text: "No podrás revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteArticle(id);
        Swal.fire("Borrado!", "El articulo fué elimnado con éxito", "success");
      }
    });
  };

  //6- usamos useEffect
  useEffect(() => {
    getArticles();
    //...
  }, []);

  //7- devolvemos la vista del componente
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-1">
              <Link to="/create" className="btn btn-secondary mt-2 mb-2">
                Crear Articulo
              </Link>
            </div>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Imagen</th>
                  <th>Intro</th>
                  <th>Titulo</th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.category}</td>
                    <td>{article.image}</td>
                    <td>{article.intro}</td>
                    <td>{article.title}</td>
                    <td>
                      <Link
                        to={`/edit/${article.id}`}
                        className="btn btn-light"
                      >
                        <i className="fas fa-solid fa-pen"></i>
                      </Link>
                      <button
                        onClick={() => confirmDelete(article.id)}
                        className="btn btn-danger"
                        type="button"
                      >
                        <i className="fas fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;

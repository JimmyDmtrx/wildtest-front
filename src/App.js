import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [newArgonaute, setNewArgonaute] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // 'http://localhost:4000/',
          'https://wildtest-back.herokuapp.com/'
        );
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
      // console.log('data', data);
    };

    fetchData();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newArgonaute.length < 3) {
      alert('name must be at least 3 chars');
    } else {
      try {
        const response = await axios.post(
          // `http://localhost:4000/create?name=${newArgonaute}`
          `https://wildtest-back.herokuapp.com/create?name=${newArgonaute}`
        );
        console.log(response.data.message);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleRemove = (id) => {
    console.log(id);
    try {
      const response = axios.delete(
        // `http://localhost:4000/delete?id=${id}`
        `https://wildtest-back.herokuapp.com/delete?id=${id}`
      );
      response && console.log('deleted');
    } catch (error) {
      console.log('here', error.message);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
          />
          Les Argonautes
        </h1>
      </header>

      <main>
        <h2>Ajouter un(e) Argonaute</h2>
        <form className="new-member-form" onSubmit={handleSubmit}>
          <label>Nom de l'Argonaute</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Charalampos"
            onChange={(e) => {
              // console.log(e.target.value);
              setNewArgonaute(e.target.value);
            }}
          />
          <button type="submit">Envoyer</button>
        </form>

        <h2>Membres de l'équipage ({data.length})</h2>
        <section className="member-list">
          {data &&
            data.map((eachArgonaute) => {
              return (
                <article className="member-item" key={eachArgonaute._id}>
                  <div className="member-container">
                    <p>{eachArgonaute.name}</p>
                    <p>id : {eachArgonaute._id}</p>

                    <span
                      className="member-cross"
                      onClick={() => {
                        handleRemove(eachArgonaute._id);
                      }}
                    >
                      X
                    </span>
                  </div>
                </article>
              );
            })}
        </section>
      </main>

      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    </div>
  );
}

export default App;

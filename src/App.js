import React, { useState, useEffect } from 'react';
import './App.css';

const palabrasIniciales = ['libro', 'perro', 'tucan', 'jaula', 'lapiz'];
const indiceInicial = 0;

function App() {
  const [palabrasOriginales, setPalabrasOriginales] = useState(palabrasIniciales);
  const [palabraOriginal, setPalabraOriginal] = useState(palabrasOriginales[indiceInicial]);
  const [palabraDesordenada, setPalabraDesordenada] = useState('');
  const [valoresEntrada, setValoresEntrada] = useState(Array(palabraOriginal.length).fill(''));
  const [indiceEntradaActual, setIndiceEntradaActual] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [mensaje, setMensaje] = useState('');
  const [indiceActual, setIndiceActual] = useState(indiceInicial);

  useEffect(() => {
    let palabraDesordenada = '';
    do {
      palabraDesordenada = palabraOriginal.split('').sort(() => Math.random() - 0.5).join('');
    } while (palabraDesordenada === palabraOriginal);

    setPalabraDesordenada(palabraDesordenada);
  }, [palabraOriginal]);

  const manejarCambioEntrada = (event) => {
    const valorActual = event.target.value;
    const valoresEntradaActualizados = [...valoresEntrada];
    valoresEntradaActualizados[indiceEntradaActual] = valorActual;
    setValoresEntrada(valoresEntradaActualizados);

    if (valorActual === palabraOriginal[indiceEntradaActual]) {
      if (indiceEntradaActual === palabraOriginal.length - 1) {
        setMensaje(`¡Correcto! La palabra es  ${palabraOriginal}`);
        const nuevasPalabras = palabrasOriginales.filter((palabra) => palabra !== palabraOriginal);
        setPalabrasOriginales(nuevasPalabras);
        if (nuevasPalabras.length > 0) {
          const nuevoIndice = Math.floor(Math.random() * nuevasPalabras.length);
          setIndiceActual(nuevoIndice);
          setPalabraOriginal(nuevasPalabras[nuevoIndice]);
          setIndiceEntradaActual(0);
          setValoresEntrada(Array(nuevasPalabras[nuevoIndice].length).fill(''));
          setMensaje('');
        } else {
          setMensaje('¡Felicidades, has adivinado todas las palabras!');
        }
      } else {
        setIndiceEntradaActual(indiceEntradaActual + 1);
        setMensaje('¡Letra correcta! Avanza al siguiente cuadro.');
      }
    } else {
      setVidas(vidas - 1);
      setMensaje('Intenta de nuevo. La letra no es correcta.');
      if (vidas === 1) {
        setMensaje('¡Perdiste! Te quedaste sin vidas.');
      }
    }
  };

  const manejarEliminar = () => {
    const valoresEntradaActualizados = [...valoresEntrada];
    valoresEntradaActualizados[indiceEntradaActual] = '';
    setValoresEntrada(valoresEntradaActualizados);
  };

  const manejarReiniciar = () => {
    const nuevoIndice = Math.floor(Math.random() * palabrasOriginales.length);
    setIndiceActual(nuevoIndice);
    setPalabraOriginal(palabrasOriginales[nuevoIndice]);
    setIndiceEntradaActual(0);
    setValoresEntrada(Array(palabrasOriginales[nuevoIndice].length).fill(''));
    setMensaje('');
  };
  const cuadrosEntrada = valoresEntrada.map((valor, indice) => (
    <div key={indice} className="input-row">
      <div className="input-container">
        <input
          type="text"
          value={valor}
          onChange={manejarCambioEntrada}
          disabled={indice !== indiceEntradaActual || vidas === 0}
          className="input"
        />
      </div>
      <div className="button-container">
        {indice === indiceEntradaActual && (
          <button onClick={manejarEliminar} className="button">
            Eliminar
          </button>
        )}
      </div>
    </div>
  ));
  

  return (
    <div className='container'>
      <h1 className='title'>Juego de Adivinar Palabra Desordenada</h1>
      <div className='info-container'>
        <p className='info-box'>Palabra Desordenada: {palabraDesordenada}</p>
        <p className='info-box'>Vidas restantes: {vidas}</p>
      </div>
      <div className="input-container">
        {cuadrosEntrada}
      </div>
      <button onClick={manejarReiniciar} className='button'>Reiniciar</button>
      <p className='message'>{mensaje}</p>
    </div>
  );
}

export default App;
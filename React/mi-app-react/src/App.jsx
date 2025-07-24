const App = () => {
  const nombre = "Carlos";

  return (
    <div>
      <h1>Hola, {nombre} 👋</h1>
      <p>Este es mi primer componente en React usando JSX.</p>
      <img
        src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif"
        alt="Hola"
        width="150"
      />
      <br />
      <button onClick={() => alert('¡Hola desde React!')}>Click aquí</button>
    </div>
  );
};

export default App;

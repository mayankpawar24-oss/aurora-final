const Test = () => {
  console.log('Test component rendering...');
  return (
    <div style={{ padding: '20px', color: 'white', background: 'black', minHeight: '100vh' }}>
      <h1>Hello World - AURORA Dashboard Test</h1>
      <p>If you can see this, React is working!</p>
      <p>Check the browser console for debug messages.</p>
    </div>
  );
};

export default Test;
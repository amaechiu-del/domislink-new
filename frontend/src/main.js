fetch('http://127.0.0.1:5000/api/hello')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.getElementById('app').innerText = data.message;
  })
  .catch(error => console.error('Error:', error));

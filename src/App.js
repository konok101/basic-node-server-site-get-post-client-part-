import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/user')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])
  const handleAdduser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //post data to server

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser=[...users, data ];
        setUsers(newUser);
      })
  }


  return (
    <div className="App">
      <h1>my own data{users.length}</h1>
      <form onSubmit={handleAdduser}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Add user" />
      </form>
      {
        users.map(user => <h3 key={user.id}>{user.name}</h3>)
      }
    </div>
  );
}

export default App;

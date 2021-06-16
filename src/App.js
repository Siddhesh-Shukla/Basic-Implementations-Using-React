import React, {useState, useEffect} from "react";
import "./App.css";

function App() {
  document.title = 'User List'

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      if(isEditing) {
        setUsers(
          users.map((user) => {
            if(user.id === editID) {
              return { ...user, name:name, email:email};
            }
            return user;
          })
        )
        setName('')
        setEmail('')
        setEditID(null)
        setIsEditing(false)
      }
      else {
        const user = { id: new Date().getTime().toString(), name:name, email:email };
        setUsers((CurrUsers) => {
          return [...CurrUsers, user];
        });
        setName('');
        setEmail('');
      }
    } 
  };

  const handleEdit = (id) => {
    const user =  users.find((user) => user.id === id);
    setIsEditing(true)
    setEditID(id)
    setName(user.name)
    setEmail(user.email)
  }

  const handleRemove = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    const newSearchedUsers = searchedUsers.filter((user) => user.id !== id);
    setSearchedUsers(newSearchedUsers)
  }

  const handleRemoveAll = () => {
    setUsers([]);
    setSearch('')
    setSearchedUsers([]);
  }

  const handleSearch = (event) => {
    let searchedString = event.target.value.toLowerCase()
    setSearch(searchedString)
  }

  useEffect(() => {
      let displayedUsers = users.filter((user) => {
        let searchValue = user.name.toLowerCase();
        return searchValue.indexOf(search) !== -1;
      })
      setSearchedUsers(displayedUsers)
  }, [search, users]);

  return (
    <>
      <div className="container">
        <form className="form">
          <div className="form-control">
            <label htmlFor="name">Name : </label>
            <input type="text" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-classic" onClick={handleSubmit}>{isEditing ? 'Save Edit' : 'Add User'}</button>
        </form>
        { users.length > 0 && <input type="text" onChange={handleSearch} placeholder="Search User" className="inputSearch"/> }
        {
          searchedUsers.map((user)=>{
            const {id, name, email} = user
            return (
              <div className='list' key={id}>  
                <span style={{textAlign: "left", width: "30%"}}><h4>{name}</h4></span>
                <span style={{textAlign: "left", width: "45%"}}><p>{email}</p></span>
                <span style={{textAlign: "right", width: "25%"}}>
                  <button onClick={()=> handleEdit(id)} className="btn btn-edit">Edit</button>
                  <button onClick={()=> handleRemove(id)}className="btn btn-remove">Remove</button>
                </span>
              </div>
            )
          })
        }
        <div>{ users.length > 0 && <button onClick={handleRemoveAll} className="btn btn-remove">Remove All</button> }</div>      
      </div>
    </>
  );
}

export default App;

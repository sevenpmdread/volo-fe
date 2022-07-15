import React,{useEffect, useState,useContext} from 'react'
import useFetch from './useFetch'
import axios from 'axios'
import CardComponent from './CardComponent';
import DisplayContext from '../Context';
function YourCards() {
  const displayMode = useContext(DisplayContext);
  const [data, setData] = useState([]);
  const [users,setUsers] = useState([])
  const [page, setPage] = useState(1);
  const [selectedUser,setselectedUser] = useState(36)
  const [isFetching, setIsFetching] = useFetch(moreData);

  const loadData = () =>{
    let url = `http://localhost:5000/api/v1/cards/yours/${selectedUser}/0`;
    axios.get(url).then(res => {
      setData(res.data);
    });
  }
  function moreData() {
    let url = `http://localhost:5000/api/v1/cards/yours/${selectedUser}/${page}`;
    axios.get(url).then(res => {
      setData([...data, ...res.data]);
      setPage(page+1)
      setIsFetching(false)
    });
  }

  const loadUsers = () =>{
    let url = "http://localhost:5000/api/v1/users/";
    axios.get(url).then(res => {
      setUsers(res.data);
    });
  }

  useEffect(()=>{
    loadUsers()
    loadData()

  }, [selectedUser])

  const handleChange = (event) => {
    console.log(event)
    setselectedUser(event.target.value)
  }

  return (
    <div>
    <div className='select-user'>
      Hi
       <select value={selectedUser} onChange={handleChange} className="select-menu">
          {users.map((option) => (
            <option value={option.user_id}>{option.username}</option>
          ))}
        </select>
    </div>
    <ul className={displayMode.grid ? 'list-all-grid' :'list-all-list ' }>
        {data.map((item, key) => (
          <CardComponent item={item} yourcard={true}/>
        ))}
    </ul>
    </div>
  )
}

export default YourCards

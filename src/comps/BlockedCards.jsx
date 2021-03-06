import React,{useEffect, useState,useContext} from 'react'
import useFetch from './useFetch'
import axios from 'axios'
import CardComponent from './CardComponent';
import DisplayContext from '../Context';
function BlockedCards() {
  const displayMode = useContext(DisplayContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useFetch(moreData);

  const loadData = () =>{
    let url = "http://localhost:5000/api/v1/cards/blocked/0";
    axios.get(url).then(res => {
      console.log(res.data)
      setData(res.data);
    });
  }
  function moreData() {
    let url = `http://localhost:5000/api/v1/cards/blocked/${page}`;
    axios.get(url).then(res => {
      setData([...data, ...res.data]);
      setPage(page+1)
      setIsFetching(false)
    });
  }

  useEffect(()=>{
    loadData()
  }, [])

  return (
    <ul className={displayMode.grid ? 'list-all-grid' :'list-all-list ' }>
    {data.map((item, key) => (
      <CardComponent item={item}/>
    ))}
</ul>
  )
}

export default BlockedCards

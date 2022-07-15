import React,{useEffect, useState,useContext} from 'react'
import useFetch from './useFetch'
import axios from 'axios'
import CardComponent from './CardComponent';
import DisplayContext from '../Context';
import NoMatch from './NoMatch';
function AllCards() {

  const displayMode = useContext(DisplayContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [noMatch,setnoMatch] = useState(false)
  const [isFetching, setIsFetching] = useFetch(moreData);

  const loadData = () =>{
    let url = `http://localhost:5000/api/v1/cards/get/${displayMode.filter.length ? displayMode.filter : 'askdhasdkjashd'}/0`;
    axios.get(url).then(res => {
      if(res.data.length == 0)
      setnoMatch(true)
      else
      setnoMatch(false)
      console.log(res.data)
      setData(res.data);
    });
  }
  function moreData() {
    let url = `http://localhost:5000/api/v1/cards/get/${displayMode.filter.length ? displayMode.filter : 'askdhasdkjashd'}/${page}`;
    axios.get(url).then(res => {
      setData([...data, ...res.data]);
      setPage(page+1)
      setIsFetching(false)
    });
  }

  useEffect(()=>{
    loadData()
    console.log(displayMode.filter)
  }, [displayMode.filter])





  return (

    <ul className={displayMode.grid ? 'list-all-grid' :'list-all-list ' }>
        {
         !noMatch ?
        data.map((item, key) => (
          <CardComponent item={item}/>
        ))
        :
        <NoMatch/>
      }
    </ul>
  )
}

export default AllCards

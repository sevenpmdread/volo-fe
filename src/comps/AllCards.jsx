import React,{useEffect, useState,useContext} from 'react'
import useFetch from './useFetch'
import axios from 'axios'
import CardComponent from './CardComponent';
import DisplayContext from '../Context';
import NoMatch from './NoMatch';
import { display } from '@mui/system';
function AllCards() {

  const displayMode = useContext(DisplayContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [noMatch,setnoMatch] = useState(false)
  const [isFetching, setIsFetching] = useFetch(moreData);
  console.log("filter",displayMode.filter,displayMode.search)
  const loadData = () =>{
    let url = `https://volo-server-nkxye02vr-sevenpmdread.vercel.app/api/v1/cards/get/${displayMode.search.length ? displayMode.search : 'askdhasdkjashd'}/0`;
    axios.post(url,{filter: displayMode.filter}).then(res => {
      if(res.data.length == 0)
      setnoMatch(true)
      else
      setnoMatch(false)
      console.log(res.data)
      setData(res.data);
    });
  }
  function moreData() {
    console.log("PAge",page)
    let url = `https://volo-server-nkxye02vr-sevenpmdread.vercel.app/api/v1/cards/get/${displayMode.search.length ? displayMode.search : 'askdhasdkjashd'}/${page}`;
    axios.post(url,{filter:displayMode.filter}).then(res => {
      setData([...data, ...res.data]);
      setPage(page+1)
      setIsFetching(false)
    });
  }

  useEffect(()=>{
    loadData()
    console.log(displayMode.filter)
    setPage(1)
    console.log(page)
  }, [displayMode.search,displayMode.filter.active])





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

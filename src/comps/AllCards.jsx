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
    let url = `https://volo-server-nkxye02vr-sevenpmdread.vercel.app/api/v1/cards/get/${displayMode.search.length ? displayMode.search : 'askdhasdkjashd'}/0`;
    axios.post(url,{filter: displayMode.filter}).then(res => {
      if(res.data.length == 0)
      setnoMatch(true)
      else
      setnoMatch(false)
      setData(res.data);
    });
  }
  function moreData() {
    let url = `https://volo-server-nkxye02vr-sevenpmdread.vercel.app/api/v1/cards/get/${displayMode.search.length ? displayMode.search : 'askdhasdkjashd'}/${page}`;
    axios.post(url,{filter:displayMode.filter}).then(res => {
      setData([...data, ...res.data]);
      setPage(page+1)
      setIsFetching(false)
    });
  }

  useEffect(()=>{
    loadData()
    setPage(1)
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

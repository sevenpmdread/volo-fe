import React, { useState,useRef,useEffect } from 'react'
import {Tabs,Tab} from '@material-ui/core'
import AllCards from './comps/AllCards'
import YourCards from './comps/YourCards'
import BlockedCards from './comps/BlockedCards'
import {  useParams,useNavigate  } from 'react-router-dom';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import DisplayContext from './Context'
import { SearchSharp } from '@mui/icons-material'

const  Home = (props) => {

  const [isGrid,setisGrid] = useState(true);
  const [searchQuery,setSearchQuery] = useState('')
  const navigate = useNavigate();
  const [inputValue,setinputValue] = useState('')
  const targetRef = useRef(null);
  const [isClicked, setisClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isClicked || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);




  let { page } = useParams();
  console.log(page)

  const tabNameToIndex = {
    0:"yours",
    1:"all",
    2:"blocked"
  }

  const indexToTabName = {
    yours:0,
    all:1,
    blocked:2
  }

  console.log(indexToTabName[page])

  const handleInput = (e) => {
    setinputValue(e.target.value)

  }

  const [selectedTab,setselectedTab] = useState(indexToTabName[page])

  const handleChange = (event,newValue) => {
    navigate(`/home/${tabNameToIndex[newValue]}`)
    setselectedTab(newValue)
    setSearchQuery('')
    setinputValue('')
  }


  return (
        <DisplayContext.Provider value={{grid:isGrid,filter:searchQuery}}>

    <div style={{borderBottom:'2px solid #e9e9e9',display:'flex',justifyContent:'space-between',alignItems:'baseline',paddingRight:42}}>
    <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Yours"

          />
          <Tab label="All" />
          <Tab label="Blocked" />

    </Tabs>
    <div>
    <GridViewRoundedIcon
    onClick={()=>setisGrid(true)}
    fontSize='60'
    sx={{marginRight:2,opacity:isGrid ? 1 : 0.6,fontSize:isGrid ? 24 : 20,transition:'0.3s'}}

    />
    <MenuRoundedIcon
        onClick={()=>setisGrid(false)}
    fontSize='60'
    sx={{opacity:isGrid ? 0.6 : 1,fontSize:isGrid ? 20 : 24,transition:'0.3s'}}
    />
    </div>
    </div>
    <div className='search-section'>
        <div className={isClicked ? 'search-container-clicked' : 'search-container'}
          onClick={() => setisClicked(true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isclicked={showSearchInput}>
        <input className='search-input'
        value={inputValue}
        onChange={handleInput}
        onKeyDown={(e)=>{
          if (e.key === 'Enter')
          setSearchQuery(inputValue)
        }}
         type="text"
        ref={targetRef} placeholder='Search' />
        <SearchRoundedIcon
        onClick={()=> setSearchQuery(inputValue)}
        sx={{  alignSelf: 'flex-end',
        opacity:isClicked  ? 1 : 0.6,
        borderRadius:2,
        cursor:'pointer',
        color:isClicked ? '#EB4869' : 'grey'
        }}
        />
        </div>
    <button className='filter'>
     <FilterListRoundedIcon
     sx={{marginRight:1}}
     />
      Filter
    </button>
    </div>
    <div className='main-content'>
    {selectedTab === 0 &&  <YourCards/>}
    {selectedTab === 1 &&  <AllCards/>}
    {selectedTab === 2 &&  <BlockedCards/>}
    </div>
    </DisplayContext.Provider>


  )
}

export default Home

import React, { useState,useRef,useEffect } from 'react'
import {Tabs,Tab} from '@material-ui/core'
import AllCards from './comps/AllCards'
import YourCards from './comps/YourCards'
import BlockedCards from './comps/BlockedCards'
import {  useParams,useNavigate  } from 'react-router-dom';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Popover from '@mui/material/Popover';
import axios from 'axios'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import DisplayContext from './Context'
import { SearchSharp } from '@mui/icons-material'

const  Home = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [users,setUsers] = useState([{user_id:'',username:'Select cardHolder'}])
  const [selectedUser,setselectedUser] = useState('')
  const [subscriptionCheck,setsubscriptionCheck] = useState(false)
  const [burnerCheck,setburnerCheck] = useState(false)
  const [filterActive,setFilterActive] = useState(false)
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
    loadUsers()
  }, []);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  let { page } = useParams();

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


  const handleInput = (e) => {
    setinputValue(e.target.value)
  }

  const [selectedTab,setselectedTab] = useState(indexToTabName[page])

  const handleChange = (event,newValue) => {
    navigate(`/home/${tabNameToIndex[newValue]}`)
    setselectedTab(newValue)
    setSearchQuery('')
    setinputValue('')
    handleClear()
  }

  

  const handleUserSelect = (event) => {
    setselectedUser(event.target.value)
  }

  const handleApply = () => {
    setFilterActive(!filterActive)
    handleClose() 
  }
  const handleClear = () => {
    setselectedUser('')
    setsubscriptionCheck(false)
    setburnerCheck(false)
    setFilterActive(!filterActive)
    handleClose() 

  }

  const loadUsers = () =>{
    let url = "https://volo-server-nkxye02vr-sevenpmdread.vercel.app/api/v1/users/";
    axios.get(url).then(res => {
      setUsers([...users,...res.data]);
    });
  }


  return (
        <DisplayContext.Provider value={{grid:isGrid,search:searchQuery,filter:{subscription:subscriptionCheck,burner: burnerCheck,userid:selectedUser,active:filterActive}}}>

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
    <button className='filter' onClick={handleClick}  style={{border: (subscriptionCheck ^ burnerCheck) || selectedUser!=''  ? '2px solid #EB4869' : 'none'}}>
     <FilterListRoundedIcon
     sx={{marginRight:1,opacity:open ? 1 : 0.6}}
     />
      Filter
    </button>
    <Popover
        id={id}
        open={open}
        sx={{top: '42px', left: '-36px'}}

       anchorEl={anchorEl}
        onClose={handleClose}

      >
      <div className='filter-card'>
      <div className='filter-title'>
      Filters
      </div>
      <div className="filter-content">
      Type
      <div className='filter-check'>
   
      <label>
        <input
          type="checkbox"
          style={{marginRight:4}}
          checked={subscriptionCheck}
          onChange={()=>setsubscriptionCheck(!subscriptionCheck)}
        />
        Subscription
      </label>
         <label>
        <input
          type="checkbox"
          style={{marginRight:4}}
          checked={burnerCheck}
          onChange={()=>setburnerCheck(!burnerCheck)}
        />
        Burner
      </label>
      </div>
      <div className='cardholder-section'>
      CardHolder
      <div className='filter-select-user'>
       <select value={selectedUser} className="filter-select-menu" onChange={handleUserSelect}>
          {users.map((option) => (
            <option value={option.user_id}>{option.username}</option>
          ))}
        </select>
    </div>
      </div>
      <div className='filter-buttons'>
        <button className='apply-button'  onClick={handleApply}>
          Apply
        </button>
        <button className='clear-button' onClick={handleClear}>
          Clear
        </button>

      </div>
      </div>
      </div>
      </Popover>
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

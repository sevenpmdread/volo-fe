import React from 'react'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LoopIcon from '@mui/icons-material/Loop';

import ProgressBar from './ProgressBar';

function CardComponent({item,yourcard}) {
  var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];;

  const convertDateString = (item) => {
    var convertDate = new Date(item.expiry)
    return convertDate.getUTCDate() + ' ' + months[convertDate.getUTCMonth() + 1]
  }
  return (
    <div className='volo-card'>
    <div className='card-header'>
      <div className='card-name'>
      {  item.name}

        <div className='card-owner'>

          {yourcard ? <></> : item.user[0].username }
          {yourcard ? <></> :
              <div style={{
              background: 'black',
              borderRadius: 100,
              opacity:0.6,
              display: 'inline-block',
              height: 6,
              width: 6,
              marginBottom: 2,
              marginLeft: 6,
              marginRight: 6}}/> }


         {item.budget_name}
        </div>
      </div>
      <div className='icon-background'>
      {item.card_type === 'Burner' ?
      <LocalFireDepartmentIcon
      sx={{color:"#EB4869"}}

      />
      :
      <LoopIcon
      sx={{color:"#EB4869"}}
      />
      }
      </div>

    </div>
    <div className='card-type-expiry'>
      <div className='card-type'>
        {item.card_type.toUpperCase()}
      </div>
      <div className="expiry">
      {
        item.card_type === 'Burner'
        ?
        `Expires: `  + convertDateString(item)

        :
        months[new Date().getMonth()] + ` Limit: `  + item.limit +  ' ' + item.available_to_spend.currency
      }
      </div>
    </div>
    <div className='spent-analytics'>
    <ProgressBar  progress={'' + (item.spent.value /(item.spent.value + item.available_to_spend.value) ) * 100}  height={6} />
      <div className="spent">
        <div>
            <div style={{
                background: '#EB4869',
                borderRadius: 100,
                display: 'inline-block',
                height: 10,
                width: 10,
                marginBottom: 2,
                marginRight: 8}}/>
              Spent
        </div>
         <div >
           {item.spent.value + ' ' +  item.spent.currency}
         </div>
      </div>
      <div className="spent spend-available">
        <div>
            <div style={{
                background: '#499359',
                borderRadius: 100,
                display: 'inline-block',
                height: 10,
                width: 10,
                marginBottom: 2,
                marginRight: 8}}/>
              Available to spend
        </div>
         <div className="spend-available">
           {item.available_to_spend.value + ' ' +  item.spent.currency}
         </div>
      </div>

    </div>
  </div>
  )
}

export default CardComponent

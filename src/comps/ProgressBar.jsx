import React from 'react'

const ProgressBar = ({progress,height}) => {

    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#499359',
        borderRadius: 40,
        marginBottom:24,
      }

      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#EB4869',
       borderRadius:40,
        textAlign: 'right'
      }

    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
      </div>
    </div>
    )
}

export default ProgressBar;

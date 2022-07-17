
import React from 'react';

// Creating the context object and passing the default values.
const displayContext = React.createContext({grid:true,search:'',filter:{subscription:false,burner: false,userid:'',active:false}});

export default displayContext;

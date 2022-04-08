import React,{ useState } from 'react';
 
function Data() {
  const [data,setData] = useState({});
  fetch('/oauth/justData')
  .then(res => res.json())
  .then(data => setData(data),()=>{
  console.log('data read : ' , data);
  })
 
  return (
    <div>

      <h1>{data.nick}</h1> 
      <h1>{data.snsId}</h1>
      <h1>{data.provider}</h1>
    </div>
  );
}

export default Data;
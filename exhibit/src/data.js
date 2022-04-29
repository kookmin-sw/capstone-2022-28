import React,{ useState } from 'react';
 
function Data() {
  const [data,setData] = useState({});
  fetch('/oauth/justData/12')
  .then(res => res.json())
  .then(data => setData(data),()=>{
  console.log('data read : ' , data);
  })
 
  return (
    <div>
      {data.nick} {data.snsId}
    </div>
  );
}

// callApi = async() =>{
// 	console.log('callApi');
// 	const response = await fetch('/api/customers');
// 	const body = await response.json();
// 	return body;
// }
 
export default Data;
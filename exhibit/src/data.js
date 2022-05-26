import React, { useState } from "react";

function Data() {
  const [data, setData] = useState({});
  fetch("/oauth/justData/12")
    .then((res) => res.json())
    .then(
      (data) => setData(data),
      () => {}
    );

  return (
    <div>
      {data.nick} {data.snsId}
    </div>
  );
}

export default Data;

import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../api/users';
import { message } from 'antd';

function Home() {
  let [userData, setUserData] = useState({});

  useEffect(() => {
    GetCurrentUser().then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setUserData(response.data.data);
      } else {
        message.error(response.data.message);
      }
    });
  }, []);

  return (
    <div>
      {userData.name}
    </div>
  )
}

export default Home
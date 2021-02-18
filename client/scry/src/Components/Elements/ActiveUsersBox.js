import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import User from '../../Assets/user-profile.svg'

const ActiveUsersBox = (props) => {
    
    const [userList, setUserList] = useState();

    async function fetchActiveUserData() {
        let response

        response = await fetch('http://127.0.0.1:8000/collection/user_connections')
        let result = await response.json()
        
        return result
    }

    function populateActiveUsers(users) {
        setUserList(
            users.map((user) => 
                <li>
                    <div class="user-flex-row">
                        <img src={User}/>

                        <div className="user-flex-row-text">
                            <h4>{user.user}</h4>
                            <p>{user.date} {user.time} {user.ip}</p>
                        </div>
                            
                    </div>
                </li>
            )
        )
    }

    useEffect(() => {
        fetchActiveUserData().then((result) => {
            populateActiveUsers(result)
        })
    }, [])


    return (
        <div className="monitor-box-div">
            <Link className="disguised-a" to="/active-users">
                <div className="monitor-box-div-card">
                    <h3>Active Users</h3>

                    <ul className="user-list-ul">
                        {userList}
                    </ul>
                </div>
            </Link>
        </div>
    );  
};
  
export default ActiveUsersBox
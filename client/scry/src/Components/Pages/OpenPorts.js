import React, {useEffect, useState} from 'react';
import User from '../../Assets/user-profile.svg'
import LeftArrow from '../../Assets/left-arrow.svg'
import { Link } from 'react-router-dom';

const ActiveUsersDetail = (props) => {

    const [userList, setUserList] = useState();

    async function fetchActiveUserData() {
        let response

        response = await fetch('http://127.0.0.1:8000/collection/user_connections')
        let result = await response.json()
        
        return result
    }

    function populateActiveUsers(users) {
        console.log(users)
        setUserList(
            users.map((user) => 
                <li>
                    <div class="user-flex-row detail">
                        <img src={User}/>

                        <div className="user-flex-row-text">
                            <h4><b>NAME - </b>{user.user}</h4>
                            <p><b>PTS - </b>{user.pts}</p>
                            <p><b>TIME - </b>{user.date} {user.time} {user.ip}</p>
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
        console.log("Do this once")
    }, [])

    return (
        <>
            <div className="detail-padded-div">
                <Link className="disguised-a" to="/"><h2><img className="nav-back-arrow" src={LeftArrow}/>Scry</h2></Link>
                <h1 style={{ marginBottom: "32px", marginTop: "8px" }}>Active Users</h1>

                <ul className="user-list-ul detail-list">
                    { userList }
                </ul>
            </div>
        </>
    );  
};
  
export default ActiveUsersDetail
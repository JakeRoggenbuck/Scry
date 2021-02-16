import React, {useEffect, useState} from 'react';
import User from '../../Assets/user-profile.svg'

const LoginHistoryBox = (props) => {
    
    var users = ['192','193','194']
    const [userList, setUserList] = useState();

    function populateActiveUsers() {
        setUserList(
            users.map((user) => 
                <li>
                    <div class="user-flex-row">
                        <img src={User}/>

                        <div className="user-flex-row-text">
                            <h4>{user}</h4>
                            <p>2/5/2021 1:35:34 PM PST</p>
                        </div>
                            
                    </div>
                </li>
            )
        )
    }

    useEffect(() => {
        populateActiveUsers()
    });

    return (
        <div className="monitor-box-div">
            <div className="monitor-box-div-card">
                <h3>Login History</h3>

                <ul className="user-list-ul">
                    { userList }
                </ul>
            </div>
        </div>
    );  
};
  
export default LoginHistoryBox
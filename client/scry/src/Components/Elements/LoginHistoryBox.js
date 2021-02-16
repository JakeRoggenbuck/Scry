import React, {useEffect, useState} from 'react';
import User from '../../Assets/user-profile.svg'

const LoginHistoryBox = (props) => {
    
    var users = ['192','193','194']
    const [userList, setUserList] = useState();

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
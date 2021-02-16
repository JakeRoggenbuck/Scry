import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import User from '../../Assets/user-profile.svg'

const ActiveUsersBox = (props) => {
    
    return (
        <div className="monitor-box-div">
            <Link className="disguised-a" to="/active-users">
                <div className="monitor-box-div-card">
                    <h3>Active Users</h3>

                    <ul className="user-list-ul">
                        <li>
                            <div class="user-flex-row">
                                <img src={User}/>

                                <div className="user-flex-row-text">
                                    <h4>192.168.0.9</h4>
                                    <p>2/5/2021 1:35:34 PM PST</p>
                                </div>
                                    
                            </div>
                        </li>
                    </ul>
                </div>
            </Link>
        </div>
    );  
};
  
export default ActiveUsersBox
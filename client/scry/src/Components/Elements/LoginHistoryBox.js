import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import User from '../../Assets/user-profile.svg'

const LoginHistoryBox = (props) => {
    
    const [sshLoginList, setSshLoginList] = useState();

    async function fetchSshLoginData() {
        let response

        response = await fetch('http://127.0.0.1:8000/collection/ssh_logins')
        let result = await response.json()
        
        return result
    }

    function populateSshLogins(logins) {
        setSshLoginList(
            logins.slice(0, 4).map((login) => 
                <tr>
                    <td>{login.month} {login.day} {login.time}</td>
                    <td>{login.device}</td>
                    <td>{login.message}</td>
                    <td>{login.user}</td>
                    <td>{login.ip}</td>
                </tr>
            )
        )
    }

    useEffect(() => {
        fetchSshLoginData().then((result) => {
            populateSshLogins(result)
        })
    }, [])

    return (
        <div className="monitor-box-div">
            <Link className="disguised-a" to="/ssh-logins">
                <div className="monitor-box-div-card">
                    <h3 style={{ marginBottom: "16px" }}>SSH Logins</h3>

                    <div className="ports-table-box-container">
                        <table className="ports-table">
                            <tr>
                                <th>TIME</th>
                                <th>DEVICE</th>
                                <th>MESSAGE</th>
                                <th>USER</th>
                                <th>IP</th>
                            </tr>

                            {sshLoginList}
                        </table>

                        <p style={{ marginTop: "16px", textAlign: "center" }}>TO VIEW MORE, CLICK HERE</p>
                    </div>
                </div>
            </Link>
        </div>
    );  
};
  
export default LoginHistoryBox
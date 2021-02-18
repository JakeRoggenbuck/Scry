import React, {useEffect, useState} from 'react';
import User from '../../Assets/user-profile.svg'
import LeftArrow from '../../Assets/left-arrow.svg'
import { Link } from 'react-router-dom';

const Ssh_Logins = (props) => {

    const [sshLoginList, setSshLoginList] = useState();

    async function fetchSshLoginData() {
        let response

        response = await fetch('http://127.0.0.1:8000/collection/ssh_logins')
        let result = await response.json()
        
        return result
    }

    function populateSshLogins(logins) {
        setSshLoginList(
            logins.map((login) => 
                <tr>
                    <td>{login.month} {login.day} {login.time}</td>
                    <td>{login.device}</td>
                    <td>{login.pid}</td>
                    <td>{login.message}</td>
                    <td>{login.user}</td>
                    <td>{login.ip}</td>
                    <td>{login.port}</td>
                    <td>{login.name}</td>
                    <td>{login.invalid_user.toString()}</td>
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
        <>
            <div className="detail-full-width-div">
                <Link className="disguised-a" to="/"><h2><img className="nav-back-arrow" src={LeftArrow}/>Scry</h2></Link>
                <h1 style={{ marginBottom: "32px", marginTop: "8px" }}>SSH Logins</h1>

                <div className="ports-table-scroll-div">
                    <table className="ports-table">
                        <tr>
                            <th>TIME</th>
                            <th>DEVICE</th>
                            <th>PID</th>
                            <th>MESSAGE</th>
                            <th>USER</th>
                            <th>IP</th>
                            <th>PORT</th>
                            <th>NAME</th>
                            <th>INVALID USER</th>
                        </tr>

                        {sshLoginList}
                    </table>
                </div>
            </div>
        </>
    );  
};
  
export default Ssh_Logins

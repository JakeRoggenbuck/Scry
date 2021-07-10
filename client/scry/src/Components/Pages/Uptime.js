import React, {useEffect, useState} from 'react';
import User from '../../Assets/user-profile.svg'
import LeftArrow from '../../Assets/left-arrow.svg'
import { Link } from 'react-router-dom';

const OpenPortsDetail = (props) => {

    const [portList, setPortList] = useState();

    async function fetchUptimeData() {
        let response

        response = await fetch('http://127.0.0.1:8000/collection/uptime')
        let result = await response.json()
        
        return result
    }

    return (
        <>
            <div className="detail-full-width-div">
                <Link className="disguised-a" to="/"><h2><img className="nav-back-arrow" src={LeftArrow}/>Scry</h2></Link>
                <h1 style={{ marginBottom: "32px", marginTop: "8px" }}>Active Users</h1>

                <div className="ports-table-scroll-div">
                    <table className="uptime">
                        <tr>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    );  
};
  
export default UptimeDetail

import React, {useEffect, useState} from 'react';
import User from '../../Assets/user-profile.svg'
import LeftArrow from '../../Assets/left-arrow.svg'
import { Link } from 'react-router-dom';

const OpenPortsDetail = (props) => {

    const [portList, setPortList] = useState();

    async function fetchPortData() {
        let response

        response = await fetch('http://127.0.0.1:8000/collection/ports')
        let result = await response.json()
        
        return result
    }

    function populateOpenPorts(ports) {
        console.log(ports)
        setPortList(
            ports.map((port) => 
                <tr>
                    <td>{port.proto}</td>
                    <td>{port.recv}</td>
                    <td>{port.send}</td>
                    <td>{port.local}</td>
                    <td>{port.foreign}</td>
                    <td>{port.state}</td>
                    <td>{port.file}</td>
                </tr>
            )
        )
    }

    useEffect(() => {
        fetchPortData().then((result) => {
            populateOpenPorts(result)
        })
        console.log("Do this once")
    }, [])

    return (
        <>
            <div className="detail-full-width-div">
                <Link className="disguised-a" to="/"><h2><img className="nav-back-arrow" src={LeftArrow}/>Scry</h2></Link>
                <h1 style={{ marginBottom: "32px", marginTop: "8px" }}>Active Users</h1>

                <div className="ports-table-scroll-div">
                    <table className="ports-table">
                        <tr>
                            <th>PROTOCOL</th>
                            <th>RECV</th>
                            <th>SEND</th>
                            <th>LOCAL</th>
                            <th>FOREIGN</th>
                            <th>STATE</th>
                            <th>FILE</th>
                        </tr>

                        {portList}
                    </table>
                </div>
            </div>
        </>
    );  
};
  
export default OpenPortsDetail
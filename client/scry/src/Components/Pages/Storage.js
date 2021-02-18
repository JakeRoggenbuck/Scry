import React, {useEffect, useState} from 'react';
import User from '../../Assets/user-profile.svg'
import LeftArrow from '../../Assets/left-arrow.svg'
import { Link } from 'react-router-dom';

const Storage = (props) => {

    const [storageList, setStorageList] = useState()
    var storageChartRaw = []
    const [storageChart, setStorageChart] = useState(<div></div>)

    function rainbowStop(h) {
        let f = (n, k = (n + h * 12) % 12) =>
          0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        let rgb2hex = (r, g, b) =>
          "#" +
          [r, g, b]
            .map(x =>
              Math.round(x * 255)
                .toString(16)
                .padStart(2, 0)
            )
            .join("");
        return rgb2hex(f(0), f(8), f(4));
      }

    async function fetchStorageData() {
        let response

        response = await fetch('http://127.0.0.1:8000/collection/storage')
        let result = await response.json()
        
        return result
    }

    function populateStorageData(processes) {
        console.log("chief")

        for (var i = 0; i < processes.length; i++) {
            var c = i / processes.length;

            console.log("hef")

            if (processes[i].percent_used != "0%") {

            storageChartRaw.push(
                <div className="storage-chart-item" style={{ width: processes[i].percent_used.slice(0, -1) + "%", backgroundColor: rainbowStop(c, 1, 0.5) }}>
                    <p>{processes[i].percent_used}</p>
                    <div className="storage-chart-item-popup">{processes[i].name} - {processes[i].percent_used}</div>
                </div>)
            }
          }

        setStorageChart(
            storageChartRaw.map((process) => 
                <>{process}</>
            )
        )

        setStorageList(
            processes.map((process) => 
                <tr>
                    <td>{process.name}</td>
                    <td>{process.size}</td>
                    <td>{process.used}</td>
                    <td>{process.avail}</td>
                    <td>{process.percent_used}</td>
                    <td>{process.mounted}</td>
                </tr>
            )
        )
    }

    useEffect(() => {
        fetchStorageData().then((result) => {
            populateStorageData(result)
        })
        console.log("Do this once")
    }, [])

    return (
        <>
            <div className="detail-full-width-div">
                <Link className="disguised-a" to="/"><h2><img className="nav-back-arrow" src={LeftArrow}/>Scry</h2></Link>
                <h1 style={{ marginBottom: "32px", marginTop: "8px" }}>Storage</h1>

                <div className="ports-table-scroll-div">
                    <div className="storage-chart-container">
                        {storageChart}
                    </div>
                    

                    <table className="ports-table">
                        <tr>
                            <th>NAME</th>
                            <th>SIZE</th>
                            <th>USED</th>
                            <th>AVAIL</th>
                            <th>PERCENT USED</th>
                            <th>MOUNTED</th>
                        </tr>

                        {storageList}
                    </table>
                </div>

                
            </div>
        </>
    );  
};
  
export default Storage

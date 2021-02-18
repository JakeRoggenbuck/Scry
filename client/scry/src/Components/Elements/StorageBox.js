import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const StorageBox = (props) => {

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
        if (processes != []) {
            for (var i = 0; i < processes.length; i++) {
                var c = i / processes.length;

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
        }
    }

    useEffect(() => {
        fetchStorageData().then((result) => {
            populateStorageData(result)
        })
    }, [])
    
    return (
        <div className="monitor-box-div">
            <Link className="disguised-a" to="/storage">
                <div className="monitor-box-div-card">
                    <h3 style={{ marginBottom: "16px" }}>Storage</h3>
                    <div className="storage-chart-container">
                        {storageChart}
                    </div>

                    <p style={{ marginTop: "16px", textAlign: "center" }}>TO VIEW MORE, CLICK HERE</p>
                </div>
            </Link>
        </div>
    );  
};
  
export default StorageBox
import { useEffect, useState } from "react";
import SideSection from "../sideSection";
import * as graphic from "./createGraphic";
import axios from 'axios'

function fetchnYear() {
    return axios.get('http://localhost:3000/rent/earnings?year=2024')
        .then(response => response.data)
        .then(response => response.data)

}


function EarningSideTwo() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchnYear()
            .then(response => setData(response))
    }, [])


    const { CircleGraphic } = graphic.default
    return (
        <SideSection>
            <div>
                <p className="text-gray-400 text-center">section two</p>
            </div>
            {   data &&
                <>
                    
                    <div>
                        <CircleGraphic data={data} />
                    </div>
                </>
            }
        </SideSection>
    );
}

export default EarningSideTwo;
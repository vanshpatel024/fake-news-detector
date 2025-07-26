import {React, useState} from 'react'
import FNDCard from '../Components/FNDCard'
import ResultCard from '../Components/ResultCard';
import InfoCards from '../Components/InfoCards';

function Home() {
    const [result, setResult] = useState(null);
    
    return (
        <>
            <FNDCard setResult={setResult}/>
            <ResultCard result={result}/>
            <InfoCards/>
        </>
    )
}

export default Home
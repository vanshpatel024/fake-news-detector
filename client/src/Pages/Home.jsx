import {React, useState} from 'react'
import FNDCard from '../Components/FNDCard'
import ResultCard from '../Components/ResultCard';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Home() {
    const [result, setResult] = useState(null);
    
    return (
        <>
            <Header/>
            <main>
                <FNDCard setResult={setResult}/>
                <ResultCard result={result}/>
            </main>
            <Footer/>
        </>
    )
}

export default Home
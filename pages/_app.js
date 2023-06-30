import Link from "next/link";
import '../styles/globals.css'
import SearchBar from '../components/Searchbar';
import LoginBar from '../components/LoginBar'

import { createContext, useState } from 'react';
export const searchContext = createContext(null)


const App = ({ Component, PagesProps }) => {
    const [searchTerm,setSearchTerm] =useState(null)
    return (
        <>
            <searchContext.Provider value={[searchTerm, setSearchTerm]}>
                <header>
                    <Link href="/">
                        <h3>Fitness Booking App</h3>
                    </Link>
                    <SearchBar/>
                    <LoginBar/>
                </header>
                

                <Component {...PagesProps} />
            </searchContext.Provider>
        </>
    )



}

export default App
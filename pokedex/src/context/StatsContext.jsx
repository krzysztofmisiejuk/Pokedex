import { createContext, useState } from 'react';

const StatsContext = createContext();

const BASE_URL = `http://localhost:3000/stats`;

const StatsProvider = ({ children }) => {
	const [stats, setStats] = useState([]);
	const fetchStats = async () => {
		try {
			const response = await fetch(BASE_URL);
			const data = await response.json();
			setStats(data);
		} catch (error) {
			console.error('ERROR:', error);
		}
	};

    const addStats = async (name, wins, loses, newExp) => {
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();
    
            const existingStats = data.find((item) => item.name === name);
    
            if (existingStats) {
                const updatedStats = {
                    ...existingStats,
                    wins: existingStats.wins + wins,
                    loses: existingStats.loses + loses,
                    newExp: existingStats.newExp + newExp,
                };
    
                const updateResponse = await fetch(`${BASE_URL}/${existingStats.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedStats),
                });
    
                if (updateResponse.ok) {
                    await fetchStats();
                } else {
                    throw new Error('Błąd podczas aktualizacji danych');
                }
            } else {
                const newStats = { name, wins, loses, newExp };
    
                const createResponse = await fetch(BASE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newStats),
                });
    
                if (createResponse.ok) {
                    await fetchStats();
                } else {
                    throw new Error('Błąd podczas tworzenia nowych statystyk');
                }
            }
        } catch (error) {
            console.error('ERROR:', error);
        }
    };
    

	return (
		<StatsContext.Provider value={{stats, setStats, fetchStats, addStats}}>
			{children}
		</StatsContext.Provider>
	);
};

export { StatsContext, StatsProvider };

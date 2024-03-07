import axios from 'axios';

export async function getFinanceData() {
    try {
        const response = await axios.get('https://api.coton.dev/finance');
        return response.data;
    } catch (error) {
        console.error('Error fetching finance data:', error);
        throw error;
    }
}
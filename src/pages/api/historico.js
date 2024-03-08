import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../utils/firestore';

export default async function handler(req, res) {
    try {
        const historicoCollection = collection(db, 'historico');
        const historicoDocs = await getDocs(historicoCollection);
  
        const historicoData = [];
  
        historicoDocs.forEach((doc) => {
            historicoData.push({ historicoDate: doc.id, ...doc.data() });
        });
  
        res.status(200).json({ historico: historicoData });
    } catch (error) {
        console.error('Erro ao recuperar dados do histórico:', error);
        res.status(500).json({ error: 'Erro interno ao recuperar dados do histórico.' });
    }
}
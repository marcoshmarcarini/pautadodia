import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../utils/firestore';

export default async function handler(req, res) {
  const jobsCollection = collection(db, 'jobs');
  const jobsSnapshot = await getDocs(jobsCollection);
  const jobsData = jobsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  res.status(200).json(jobsData);
}
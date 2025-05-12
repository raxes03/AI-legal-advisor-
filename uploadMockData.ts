import { firestore } from '../services/firebase'; // adjust the path if needed
import { setDoc, doc } from 'firebase/firestore';

// Call this function in an Admin-only component
export const uploadMockData = async () => {
  const mockData = {
    firReports: [
      {
        fid: 'FIR123',
        userId: 'user_001',
        description: 'A theft occurred at the marketplace.',
        predictedSections: ['IPC 379', 'IPC 411'],
        createdAt: new Date().toISOString(),
        status: 'Pending',
        pdfUrl: '',
      },
      {
        fid: 'FIR124',
        userId: 'user_002',
        description: 'An assault incident reported in a public park.',
        predictedSections: ['IPC 323', 'IPC 341'],
        createdAt: new Date().toISOString(),
        status: 'Resolved',
        pdfUrl: '',
      },
    ],
    legalQueries: [
      {
        qid: 'QUERY001',
        userId: 'user_001',
        question: 'What can I do if someone refuses to return borrowed money?',
        response: 'You may send a legal notice and file a civil recovery suit.',
        createdAt: new Date().toISOString(),
      },
      {
        qid: 'QUERY002',
        userId: 'user_002',
        question: 'Can I get a divorce without going to court?',
        response: 'Mutual consent divorce is possible without trial proceedings.',
        createdAt: new Date().toISOString(),
      },
    ],
    appointments: [
      {
        aid: 'APT001',
        userId: 'user_001',
        lawyerId: 'lawyer_001',
        date: '2025-05-10',
        time: '14:00',
        status: 'Confirmed',
      },
      {
        aid: 'APT002',
        userId: 'user_002',
        lawyerId: 'lawyer_001',
        date: '2025-05-12',
        time: '10:30',
        status: 'Pending',
      },
    ],
    users: [
      {
        uid: 'user_001',
        displayName: 'Rakesh Verma',
        email: 'rakesh@example.com',
        role: 'citizen',
        city: 'Mathura',
        createdAt: new Date().toISOString(),
        photoURL: '',
      },
      {
        uid: 'user_002',
        displayName: 'Anita Sharma',
        email: 'anita@example.com',
        role: 'citizen',
        city: 'Agra',
        createdAt: new Date().toISOString(),
        photoURL: '',
      },
      {
        uid: 'lawyer_001',
        displayName: 'Adv. Meera Singh',
        email: 'meera@example.com',
        role: 'lawyer',
        city: 'Delhi',
        createdAt: new Date().toISOString(),
        photoURL: '',
      },
    ],
  };

  for (const [collectionName, documents] of Object.entries(mockData)) {
    for (const docData of documents) {
      const id = 'fid' in docData
        ? docData.fid
        : 'qid' in docData
        ? docData.qid
        : 'aid' in docData
        ? docData.aid
        : 'uid' in docData
        ? docData.uid
        : undefined;
      const ref = id
        ? doc(firestore, collectionName, id)
        : doc(firestore, collectionName);
      await setDoc(ref, docData);
    }
  }

  console.log('✅ Mock data uploaded to Firestore!');
};

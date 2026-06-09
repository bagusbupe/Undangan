import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export function useWishes() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData = [];
      snapshot.forEach((doc) => {
        wishesData.push({ id: doc.id, ...doc.data() });
      });
      setWishes(wishesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Submit wish
  const submitWish = async (name, message, attendance) => {
    if (!name.trim() || !message.trim() || !attendance) {
      throw new Error('Lengkapi dulu ya 😅');
    }

    if (message.length < 5) {
      throw new Error('Ucapan minimal 5 karakter 😅');
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'wishes'), {
        name: name.trim(),
        message: message.trim(),
        attendance,
        createdAt: Timestamp.now(),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getTotalAttendees = () => {
    return wishes.filter((wish) => wish.attendance === 'hadir').length;
  };

  return {
    wishes,
    loading,
    submitting,
    submitWish,
    getTotalAttendees,
  };
}

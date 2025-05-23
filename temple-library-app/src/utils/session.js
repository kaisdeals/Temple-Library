// session.js

// Utility to manage session state in localStorage

const SESSION_KEY = 'godKidsLibrarySession';

export const startSession = (userData) => {
  const sessionData = {
    ...userData,
    startTime: new Date().toISOString()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const updateSession = (updates) => {
  const session = getSession();
  if (session) {
    const updatedSession = { ...session, ...updates };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
  }
};

export const endSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

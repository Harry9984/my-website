import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase, hasValidConfig } from './lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import AuthForm from './components/AuthForm';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import LandingPage from './components/LandingPage';

function App() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  const isAdmin = (user: SupabaseUser | null) => {
    return user?.email === 'admin@themarketsecret.com';
  };

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      if (hasValidConfig) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user ?? null);
        } catch (error) {
          console.error('Error getting session:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    
    getSession();

    // Listen for auth changes only if we have valid config
    let subscription: any = null;
    if (hasValidConfig) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
      subscription = data;
    }

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/auth" 
          element={
            user ? (
              isAdmin(user) ? <Navigate to="/admin" /> : <Navigate to="/student" />
            ) : (
              <AuthForm />
            )
          } 
        />
        <Route
          path="/admin"
          element={
            user && isAdmin(user) ? <AdminDashboard /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/student"
          element={
            user && !isAdmin(user) ? <StudentDashboard user={user} /> : <Navigate to="/auth" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

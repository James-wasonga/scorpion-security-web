
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminDashboard from '@/components/AdminDashboard';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Dashboard session:', session);
        if (!session?.user) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "Please log in to access the dashboard.",
          });
          navigate('/');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        console.log('Dashboard profile:', { profile, error });

        if (error) {
          console.error('Profile query error:', error.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to verify admin privileges. Please contact support.",
          });
          navigate('/');
          return;
        }

        if (profile?.role === 'admin') {
          setIsAdmin(true);
        } else {
          console.log('User role:', profile?.role);
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "Admin privileges required to access the dashboard.",
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "An error occurred while checking authentication.",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirect handled in useEffect
  }

  return <AdminDashboard onLogout={async () => {
    await supabase.auth.signOut();
    navigate('/');
  }} />;
};

export default Dashboard;
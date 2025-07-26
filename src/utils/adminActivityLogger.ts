
import { supabase } from '@/integrations/supabase/client';

export interface ActivityLogData {
  action: string;
  details?: Record<string, any>;
}

export const logAdminActivity = async (data: ActivityLogData) => {
  try {
    // Get user info
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get user agent and approximate IP (client-side)
    const userAgent = navigator.userAgent;

    await supabase.from('admin_activity_logs').insert({
      admin_id: user.id,
      action: data.action,
      details: data.details || null,
      user_agent: userAgent,
      // IP address will be null as we can't get real IP client-side
      ip_address: null
    });
  } catch (error) {
    console.error('Failed to log admin activity:', error);
  }
};

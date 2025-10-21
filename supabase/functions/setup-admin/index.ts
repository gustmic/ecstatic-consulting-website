import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const adminEmail = 'admin@ecstatic.consulting';
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');

    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD not configured');
    }

    console.log('Checking if admin user exists...');

    // Check if admin user already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
    const adminUser = existingUser?.users.find(u => u.email === adminEmail);

    let userId: string;

    if (adminUser) {
      console.log('Admin user already exists:', adminUser.id);
      userId = adminUser.id;
      
      // Update password in case it changed
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: adminPassword
      });
      console.log('Admin password updated');
    } else {
      console.log('Creating new admin user...');
      
      // Create admin user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });

      if (createError) throw createError;
      if (!newUser.user) throw new Error('Failed to create user');

      userId = newUser.user.id;
      console.log('Admin user created:', userId);
    }

    // Check if admin role already assigned
    const { data: existingRole } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!existingRole) {
      console.log('Assigning admin role...');
      
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'admin'
        });

      if (roleError) {
        console.error('Error assigning admin role:', roleError);
        throw roleError;
      }
      
      console.log('Admin role assigned successfully');
    } else {
      console.log('Admin role already assigned');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Admin user configured successfully',
        userId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in setup-admin:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

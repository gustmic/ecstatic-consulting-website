-- Drop all existing permissive policies and create admin-only policies

-- CONTACTS TABLE
DROP POLICY IF EXISTS "Users can view all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can delete contacts" ON public.contacts;

CREATE POLICY "Only admins can view contacts" ON public.contacts
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert contacts" ON public.contacts
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());

CREATE POLICY "Only admins can update contacts" ON public.contacts
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete contacts" ON public.contacts
FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- COMPANIES TABLE
DROP POLICY IF EXISTS "Users can view all companies" ON public.companies;
DROP POLICY IF EXISTS "Users can insert companies" ON public.companies;
DROP POLICY IF EXISTS "Users can update companies" ON public.companies;
DROP POLICY IF EXISTS "Users can delete companies" ON public.companies;

CREATE POLICY "Only admins can view companies" ON public.companies
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert companies" ON public.companies
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update companies" ON public.companies
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete companies" ON public.companies
FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- PROJECTS TABLE
DROP POLICY IF EXISTS "Users can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete projects" ON public.projects;

CREATE POLICY "Only admins can view projects" ON public.projects
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert projects" ON public.projects
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());

CREATE POLICY "Only admins can update projects" ON public.projects
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete projects" ON public.projects
FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- TASKS TABLE
DROP POLICY IF EXISTS "Users can view all tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can insert tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Users can delete tasks" ON public.tasks;

CREATE POLICY "Only admins can view tasks" ON public.tasks
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert tasks" ON public.tasks
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND created_by = auth.uid());

CREATE POLICY "Only admins can update tasks" ON public.tasks
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete tasks" ON public.tasks
FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- PROJECT_CONTACTS TABLE
DROP POLICY IF EXISTS "Users can view all project_contacts" ON public.project_contacts;
DROP POLICY IF EXISTS "Users can insert project_contacts" ON public.project_contacts;
DROP POLICY IF EXISTS "Users can delete project_contacts" ON public.project_contacts;

CREATE POLICY "Only admins can view project_contacts" ON public.project_contacts
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert project_contacts" ON public.project_contacts
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete project_contacts" ON public.project_contacts
FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- PROJECT_COMPANIES TABLE
DROP POLICY IF EXISTS "Users can view all project_companies" ON public.project_companies;
DROP POLICY IF EXISTS "Users can insert project_companies" ON public.project_companies;
DROP POLICY IF EXISTS "Users can delete project_companies" ON public.project_companies;

CREATE POLICY "Only admins can view project_companies" ON public.project_companies
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert project_companies" ON public.project_companies
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete project_companies" ON public.project_companies
FOR DELETE USING (public.has_role(auth.uid(), 'admin'::app_role));

-- SETTINGS TABLE
DROP POLICY IF EXISTS "Users can view settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.settings;

CREATE POLICY "Only admins can view settings" ON public.settings
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can modify settings" ON public.settings
FOR ALL USING (public.has_role(auth.uid(), 'admin'::app_role));

-- PROFILES TABLE - Keep user-specific and admin access
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = user_id);
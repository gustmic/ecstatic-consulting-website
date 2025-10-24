-- Enable realtime for CRM tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.interactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
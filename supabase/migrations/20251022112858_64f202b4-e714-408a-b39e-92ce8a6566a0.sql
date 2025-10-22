-- Create user preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  default_contacts_view TEXT NOT NULL DEFAULT 'table',
  items_per_page INTEGER NOT NULL DEFAULT 25,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  date_format TEXT NOT NULL DEFAULT 'MM/dd/yyyy',
  theme TEXT NOT NULL DEFAULT 'system',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON public.user_preferences
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
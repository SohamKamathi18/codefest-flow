-- Fix function search path security warnings by setting immutable search paths

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Fix update_team_member_count function  
CREATE OR REPLACE FUNCTION public.update_team_member_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.teams
    SET 
      current_members = current_members + 1,
      is_full = (current_members + 1) >= max_members
    WHERE id = NEW.team_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.teams
    SET 
      current_members = current_members - 1,
      is_full = false
    WHERE id = OLD.team_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Fix calculate_total_score function
CREATE OR REPLACE FUNCTION public.calculate_total_score()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  total DECIMAL(5,2) := 0;
  score_value DECIMAL(5,2);
  key TEXT;
BEGIN
  -- Calculate total from JSONB scores
  FOR key IN SELECT jsonb_object_keys(NEW.scores)
  LOOP
    score_value := (NEW.scores->>key)::DECIMAL(5,2);
    total := total + score_value;
  END LOOP;
  
  NEW.total_score := total;
  RETURN NEW;
END;
$$;

-- Fix has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fix is_event_organizer function
CREATE OR REPLACE FUNCTION public.is_event_organizer(_user_id UUID, _event_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.events
    WHERE id = _event_id AND organizer_id = _user_id
  )
$$;

-- Fix is_team_member function
CREATE OR REPLACE FUNCTION public.is_team_member(_user_id UUID, _team_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE team_id = _team_id AND user_id = _user_id
  )
$$;

-- Fix is_assigned_judge function
CREATE OR REPLACE FUNCTION public.is_assigned_judge(_user_id UUID, _event_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.judge_assignments
    WHERE event_id = _event_id AND judge_id = _user_id
  )
$$;
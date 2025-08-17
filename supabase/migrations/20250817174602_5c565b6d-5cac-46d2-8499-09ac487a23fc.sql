-- Create enum types for better type safety
CREATE TYPE public.user_role AS ENUM ('organizer', 'participant', 'judge', 'admin');
CREATE TYPE public.event_status AS ENUM ('draft', 'upcoming', 'active', 'judging', 'completed', 'cancelled');
CREATE TYPE public.submission_status AS ENUM ('draft', 'submitted', 'under_review', 'scored');
CREATE TYPE public.event_type AS ENUM ('online', 'offline', 'hybrid');

-- User profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  github_username TEXT,
  linkedin_url TEXT,
  skills TEXT[],
  university TEXT,
  graduation_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User roles table (separate from profiles for flexibility)
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  theme TEXT,
  tracks TEXT[],
  rules TEXT[],
  prizes JSONB, -- {first: {title: "First Prize", amount: 1000, description: ""}}
  sponsors JSONB, -- {name: "", logo_url: "", website: "", tier: ""}[]
  event_type event_type NOT NULL DEFAULT 'online',
  status event_status NOT NULL DEFAULT 'draft',
  max_team_size INTEGER NOT NULL DEFAULT 4,
  min_team_size INTEGER NOT NULL DEFAULT 1,
  allow_solo_participants BOOLEAN NOT NULL DEFAULT true,
  registration_start TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_end TIMESTAMP WITH TIME ZONE NOT NULL,
  event_start TIMESTAMP WITH TIME ZONE NOT NULL,
  event_end TIMESTAMP WITH TIME ZONE NOT NULL,
  submission_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  judging_start TIMESTAMP WITH TIME ZONE,
  judging_end TIMESTAMP WITH TIME ZONE,
  results_announced TIMESTAMP WITH TIME ZONE,
  location TEXT, -- for offline/hybrid events
  banner_url TEXT,
  organizer_id UUID NOT NULL REFERENCES auth.users(id),
  contact_email TEXT,
  external_links JSONB, -- {discord: "", slack: "", website: ""}
  judging_criteria JSONB, -- {innovation: 30, technical: 25, presentation: 25, impact: 20}
  total_participants INTEGER DEFAULT 0,
  total_teams INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  team_leader_id UUID NOT NULL REFERENCES auth.users(id),
  max_members INTEGER NOT NULL DEFAULT 4,
  current_members INTEGER NOT NULL DEFAULT 1,
  is_full BOOLEAN NOT NULL DEFAULT false,
  invite_code TEXT UNIQUE,
  github_repo TEXT,
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name, event_id)
);

-- Team members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- 'leader', 'member'
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id),
  UNIQUE(user_id, team_id) -- Prevent user from joining multiple teams in same event
);

-- Event registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  registration_data JSONB, -- Store additional form fields
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Project submissions table
CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  demo_url TEXT,
  github_url TEXT,
  youtube_url TEXT,
  presentation_url TEXT,
  file_urls TEXT[], -- For uploaded files
  technologies_used TEXT[],
  status submission_status NOT NULL DEFAULT 'draft',
  submitted_at TIMESTAMP WITH TIME ZONE,
  round_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, team_id, round_number)
);

-- Judges assignments
CREATE TABLE public.judge_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  judge_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, judge_id)
);

-- Submission scores table
CREATE TABLE public.submission_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  judge_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scores JSONB NOT NULL, -- {innovation: 8, technical: 7, presentation: 9, impact: 8}
  total_score DECIMAL(5,2),
  feedback TEXT,
  private_notes TEXT, -- Only visible to organizers
  scored_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(submission_id, judge_id)
);

-- Announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_important BOOLEAN NOT NULL DEFAULT false,
  target_audience TEXT[] DEFAULT ARRAY['all'], -- 'all', 'participants', 'judges', 'organizers'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Event favorites/bookmarks
CREATE TABLE public.event_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judge_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_favorites ENABLE ROW LEVEL SECURITY;

-- Helper function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper function to check if user is event organizer
CREATE OR REPLACE FUNCTION public.is_event_organizer(_user_id UUID, _event_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.events
    WHERE id = _event_id AND organizer_id = _user_id
  )
$$;

-- Helper function to check if user is team member
CREATE OR REPLACE FUNCTION public.is_team_member(_user_id UUID, _team_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE team_id = _team_id AND user_id = _user_id
  )
$$;

-- Helper function to check if user is assigned judge
CREATE OR REPLACE FUNCTION public.is_assigned_judge(_user_id UUID, _event_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.judge_assignments
    WHERE event_id = _event_id AND judge_id = _user_id
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for events
CREATE POLICY "Anyone can view published events" ON public.events FOR SELECT USING (status != 'draft' OR organizer_id = auth.uid());
CREATE POLICY "Organizers can manage their events" ON public.events FOR ALL USING (organizer_id = auth.uid());
CREATE POLICY "Admins can manage all events" ON public.events FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for teams
CREATE POLICY "Anyone can view teams in published events" ON public.teams FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND status != 'draft')
);
CREATE POLICY "Team members can update their team" ON public.teams FOR UPDATE USING (
  public.is_team_member(auth.uid(), id) OR 
  public.is_event_organizer(auth.uid(), event_id)
);
CREATE POLICY "Registered users can create teams" ON public.teams FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.event_registrations WHERE event_id = teams.event_id AND user_id = auth.uid())
);

-- RLS Policies for team_members
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Team leaders and organizers can manage members" ON public.team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.teams WHERE id = team_id AND team_leader_id = auth.uid()) OR
  public.is_event_organizer(auth.uid(), (SELECT event_id FROM public.teams WHERE id = team_id))
);
CREATE POLICY "Users can join teams" ON public.team_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for event_registrations
CREATE POLICY "Users can view registrations for their events" ON public.event_registrations FOR SELECT USING (
  auth.uid() = user_id OR
  public.is_event_organizer(auth.uid(), event_id) OR
  public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Users can register for events" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own registration" ON public.event_registrations FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for submissions
CREATE POLICY "Team members and judges can view submissions" ON public.submissions FOR SELECT USING (
  public.is_team_member(auth.uid(), team_id) OR
  public.is_assigned_judge(auth.uid(), event_id) OR
  public.is_event_organizer(auth.uid(), event_id) OR
  public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Team members can manage their submissions" ON public.submissions FOR ALL USING (
  public.is_team_member(auth.uid(), team_id)
);

-- RLS Policies for judge_assignments
CREATE POLICY "Judges and organizers can view assignments" ON public.judge_assignments FOR SELECT USING (
  auth.uid() = judge_id OR
  public.is_event_organizer(auth.uid(), event_id) OR
  public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Organizers can manage judge assignments" ON public.judge_assignments FOR ALL USING (
  public.is_event_organizer(auth.uid(), event_id) OR
  public.has_role(auth.uid(), 'admin')
);

-- RLS Policies for submission_scores
CREATE POLICY "Relevant users can view scores" ON public.submission_scores FOR SELECT USING (
  auth.uid() = judge_id OR
  public.is_team_member(auth.uid(), (SELECT team_id FROM public.submissions WHERE id = submission_id)) OR
  public.is_event_organizer(auth.uid(), (SELECT event_id FROM public.submissions WHERE id = submission_id)) OR
  public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Judges can manage their scores" ON public.submission_scores FOR ALL USING (auth.uid() = judge_id);

-- RLS Policies for announcements
CREATE POLICY "Event participants can view announcements" ON public.announcements FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.event_registrations WHERE event_id = announcements.event_id AND user_id = auth.uid()) OR
  public.is_event_organizer(auth.uid(), event_id) OR
  public.is_assigned_judge(auth.uid(), event_id)
);
CREATE POLICY "Organizers can manage announcements" ON public.announcements FOR ALL USING (
  public.is_event_organizer(auth.uid(), event_id)
);

-- RLS Policies for event_favorites
CREATE POLICY "Users can view their own favorites" ON public.event_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own favorites" ON public.event_favorites FOR ALL USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_submission_scores_updated_at BEFORE UPDATE ON public.submission_scores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  
  -- Assign default participant role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'participant');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update team member count
CREATE OR REPLACE FUNCTION public.update_team_member_count()
RETURNS TRIGGER
LANGUAGE plpgsql
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

-- Trigger to update team member count
CREATE TRIGGER update_team_member_count_trigger
  AFTER INSERT OR DELETE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_team_member_count();

-- Function to calculate total score
CREATE OR REPLACE FUNCTION public.calculate_total_score()
RETURNS TRIGGER
LANGUAGE plpgsql
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

-- Trigger to calculate total score
CREATE TRIGGER calculate_total_score_trigger
  BEFORE INSERT OR UPDATE ON public.submission_scores
  FOR EACH ROW EXECUTE FUNCTION public.calculate_total_score();

-- Create indexes for better performance
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_organizer ON public.events(organizer_id);
CREATE INDEX idx_teams_event ON public.teams(event_id);
CREATE INDEX idx_team_members_team ON public.team_members(team_id);
CREATE INDEX idx_team_members_user ON public.team_members(user_id);
CREATE INDEX idx_submissions_event ON public.submissions(event_id);
CREATE INDEX idx_submissions_team ON public.submissions(team_id);
CREATE INDEX idx_submission_scores_submission ON public.submission_scores(submission_id);
CREATE INDEX idx_judge_assignments_event ON public.judge_assignments(event_id);
CREATE INDEX idx_judge_assignments_judge ON public.judge_assignments(judge_id);
CREATE INDEX idx_announcements_event ON public.announcements(event_id);
CREATE INDEX idx_event_registrations_event_user ON public.event_registrations(event_id, user_id);
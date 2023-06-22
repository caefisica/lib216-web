import { Auth } from '@supabase/ui'
import { supabase } from '../supabase'

export default function AuthPage() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Auth supabaseClient={supabase} />
    </Auth.UserContextProvider>
  )
}

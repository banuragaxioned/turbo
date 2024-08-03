import { redirect } from 'next/navigation'
import AccountForm from './account-form'
import { createClient } from '@repo/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/')
  }

  return <AccountForm user={user} />
}
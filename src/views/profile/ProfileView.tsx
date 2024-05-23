/* eslint-disable curly */
import Spinner from '@/components/Spinner'
import { useAuth } from '@/hooks/useAuth'
import ProfileForm from './ProfileForm'

export default function ProfileView () {
  const { data, isLoading } = useAuth()
  if (isLoading) return (<Spinner/>)
  if (data) return (
    <ProfileForm data={data}/>)
}

import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api/AuthApi'

export const useAuth = () => {
  const { data, isError, isLoading, error } = useQuery(
    {
      queryKey: ['user'],
      queryFn: getUser,
      retry: 0,
      refetchOnWindowFocus: false
    }
  )
  return { data, isError, isLoading, error }
}

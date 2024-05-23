import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import { useState } from 'react'
import { ConfirmToken } from '@/types/index'
import { useParams } from 'react-router-dom'

export default function NewPasswordView () {
  const params = useParams()
  const tokenId = params.tokenId!
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
      {
        !isValidToken
          ? <NewPasswordToken tokenId={tokenId} token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>
          : <NewPasswordForm token={token}/>
      }
    </>
  )
}

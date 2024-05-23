import { validateToken } from '@/api/AuthApi'
import { ConfirmToken } from '@/types/index'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
type NewPasswordTokenProps ={
    tokenId:string
    token:ConfirmToken['token']
    setToken: Dispatch<SetStateAction<string>>
    setIsValidToken: Dispatch<SetStateAction<boolean>>
}
export default function NewPasswordToken ({ tokenId, token, setToken, setIsValidToken }:NewPasswordTokenProps) {
  const handleChange = (token: ConfirmToken['token']) => { setToken(token) }
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      setIsValidToken(true)
    }
  })
  const handleComplete = (token: ConfirmToken['token']) => {
    const data = {
      token,
      tokenId
    }
    mutate(data)
  }

  return (
        <>
            <h1 className="text-5xl font-black text-white">Restablecer contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
  )
}

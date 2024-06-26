/* eslint-disable no-redeclare */
import { useNavigate } from 'react-router-dom'
import { ConfirmToken, NewPasswordFormT } from '@/types/index'
import { useForm } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { updatePasswordWithToken } from '@/api/AuthApi'
import { toast } from 'react-toastify'
type NewPasswordFormProps = {
    token: ConfirmToken['token']
}
export default function NewPasswordForm ({ token }:NewPasswordFormProps) {
  const navigate = useNavigate()
  const initialValues: NewPasswordFormT = {
    password: '',
    password_confirmation: ''
  }
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => { toast.error(error.message) },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/auth/login')
    }
  })
  const handleNewPassword = (formData: NewPasswordFormT) => {
    const data = {
      formData,
      token
    }
    mutate(data)
  }

  const password = watch('password')

  return (
        <>
            <h1 className="text-5xl font-black text-white">Restablecer contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa tu nueva  {''}
                <span className=" text-fuchsia-500 font-bold">contraseña</span>
            </p>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Contraseña</label>

                    <input
                        type="password"
                        placeholder="Contraseña de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register('password', {
                          required: 'La contraseña es obligatoria',
                          minLength: {
                            value: 8,
                            message: 'La contraseña debe tener mínimo de 8 caracteres'
                          }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repetir contraseña</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register('password_confirmation', {
                          required: 'Repetir la contraseña es obligatorio',
                          validate: value => value === password || 'Las contraseñas no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Establecer contraseña'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
  )
}

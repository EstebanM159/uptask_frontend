import { useForm } from 'react-hook-form'
import { UserLoginForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authenticateUser } from '@/api/AuthApi'
import { toast } from 'react-toastify'

export default function LoginView () {
  const navigate = useNavigate()
  const initialValues: UserLoginForm = {
    email: '',
    password: ''
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })
  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-2xl font-light text-white mt-5">
        Comienza a planificar tus proyectos {''}
        <span className=" text-fuchsia-500 font-bold"> iniciando sesión en este formulario</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'E-mail no válido'
              }
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register('password', {
              required: 'La contraseña es obligatoria'
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className='mt-10 flex flex-col space-y-4'>
          <p className='text-sm font-normal text-gray-300 text-center'>
            ¿No tienes cuenta? <Link to={'/auth/register'} className='text-fuchsia-600'>Crea una</Link>
          </p>
          <p className='text-sm font-normal text-gray-300 text-center'>
            ¿Olvidaste tu contraseña? <Link to={'/auth/forgot-password'} className='text-fuchsia-600'>Restablecer</Link>
          </p>
      </nav>
    </>
  )
}

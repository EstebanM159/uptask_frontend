/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@/hooks/useAuth'
import { Note } from '@/types/index'
import { formatDate } from '@/utils/utils'
import { useMemo } from 'react'
import Spinner from '../Spinner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNote } from '@/api/NoteApi'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

type NoteDetailProps = {
    note:Note
}
export default function NoteDetail ({ note }:NoteDetailProps) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const params = useParams()
  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!
  const { data, isLoading } = useAuth()
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
    }
  })
  if (isLoading) return <Spinner></Spinner>
  return (
    <div className='p-3 flex justify-between items-center'>
        <div>
            <p>{note.content} por: <span className='font-bold'>{note.createdBy.name}</span></p>
            <p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
        </div>
        {
           canDelete && (
           <button
                type='button'
                className='bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors'
                onClick={() => mutate({ projectId, taskId, noteId: note._id })}
            >Eliminar</button>)
        }
    </div>
  )
}

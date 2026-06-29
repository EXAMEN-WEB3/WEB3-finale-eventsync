﻿'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParticipant } from '@/context/AuthContext'
import toast from 'react-hot-toast'
import {
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/24/outline'



export default function LoginPage() {
  const [tab, setTab] = useState('participant')

  const router = useRouter()

  const { loginParticipant } = useParticipant()

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminLoading, setAdminLoading] =
      useState(false)

  const handleAdminLogin = async (e) => {
    e.preventDefault()

    setAdminError('')
    setAdminLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setAdminLoading(false)

    if (res?.error) {
      setAdminError(
          'Email ou mot de passe incorrect'
      )

      toast.error('Identifiants invalides')
    } else {
      toast.success(
          'Connexion admin réussie'
      )

      router.push('/admin/dashboard')
    }
  }

  
  const [pseudo, setPseudo] = useState('')
  const [pseudoError, setPseudoError] =
      useState('')

  const handleParticipantLogin = (e) => {
    e.preventDefault()

    const trimmed = pseudo.trim()

    if (!trimmed || trimmed.length < 2) {
      setPseudoError(
          'Le pseudo doit contenir au moins 2 caractères'
      )

      return
    }

    loginParticipant(trimmed)

    toast.success(`Bienvenue, ${trimmed} !`)

    router.push('/')
  }

  return (
      <div className="top-10 login-shell flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full  px-5 py-3 text-sm font-black uppercase tracking-wide text-[var(--color-foreground)] shadow-2xl backdrop-blur-md">
              <span className="text-3xl">Event Access</span>
            </div>
          </div>

          
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] shadow-2xl backdrop-blur-xl">
            
            <div className="flex border-b border-white/10">
              <button
                  onClick={() =>
                      setTab('participant')
                  }
                  className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                      tab === 'participant'
                          ? 'border-b-2 border-emerald-600 bg-[#10B981]/15 text-[#10B981]'
                          : 'text-gray-400 hover:bg-[#111827] hover:text-gray-300'
                  }`}
              >
                <UserIcon className="h-4 w-4" />
                Participant
              </button>

              <button
                  onClick={() => setTab('admin')}
                  className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                      tab === 'admin'
                          ? 'border-b-2 border-emerald-600 bg-[#10B981]/15 text-[#10B981]'
                          : 'text-gray-400 hover:bg-[#111827] hover:text-gray-300'
                  }`}
              >
                <ShieldCheckIcon className="h-4 w-4" />
                Administrateur
              </button>
            </div>

            <div className="p-8">
              
              {tab === 'participant' && (
                  <form
                      onSubmit={
                        handleParticipantLogin
                      }
                      className="space-y-5"
                  >
                    <div>
                      <h2 className="mb-1 text-xl font-bold text-[#F9FAFB]">
                        Espace participant
                      </h2>

                      <p className="text-sm text-gray-400">
                        Choisissez un pseudo pour
                        suivre vos sessions et poser
                        des questions.
                      </p>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-400">
                        Votre pseudo
                      </label>

                      <input
                          type="text"
                          value={pseudo}
                          onChange={(e) => {
                            setPseudo(
                                e.target.value
                            )

                            setPseudoError('')
                          }}
                          placeholder="ex : Rakoto, Rabe123..."
                          className="w-full rounded-xl border border-white/15 px-4 py-2.5 outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                          autoFocus
                      />

                      {pseudoError && (
                          <p className="mt-1 text-xs text-red-500">
                            {pseudoError}
                          </p>
                      )}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#10B981] py-2.5 font-semibold text-white transition duration-200 hover:bg-emerald-700"
                    >
                      Rejoindre en tant que
                      participant
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-[#10B981] hover:bg-[#10B981]/15 hover:text-[#10B981]"
                    >
                      Explorer sans connexion
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Vos favoris et questions seront
                      sauvegardés localement.
                    </p>
                  </form>
              )}

              
              {tab === 'admin' && (
                  <form
                      onSubmit={handleAdminLogin}
                      className="space-y-5"
                  >
                    <div>
                      <h2 className="mb-1 text-xl font-bold text-[#F9FAFB]">
                        Espace administrateur
                      </h2>

                      <p className="text-sm text-gray-400">
                        Accédez au tableau de bord de
                        gestion.
                      </p>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-400">
                        Email
                      </label>

                      <input
                          type="email"
                          value={email}
                          onChange={(e) =>
                              setEmail(
                                  e.target.value
                              )
                          }
                          className="w-full rounded-xl border border-white/15 px-4 py-2.5 outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                          required
                          autoFocus
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-400">
                        Mot de passe
                      </label>

                      <input
                          type="password"
                          value={password}
                          onChange={(e) =>
                              setPassword(
                                  e.target.value
                              )
                          }
                          className="w-full rounded-xl border border-white/15 px-4 py-2.5 outline-none transition focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                          required
                      />
                    </div>

                    {adminError && (
                        <p className="text-center text-sm text-red-500">
                          {adminError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={adminLoading}
                        className="w-full rounded-xl bg-[#10B981] py-2.5 font-semibold text-white transition duration-200 hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {adminLoading
                          ? 'Connexion...'
                          : 'Se connecter'}
                    </button>
                  </form>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

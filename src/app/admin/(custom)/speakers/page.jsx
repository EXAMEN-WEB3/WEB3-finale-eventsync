'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  IdentificationIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { LoadingSpinner, SpeakerAvatar } from '@/components/ui'

export default function AdminSpeakersPage() {
  const [speakers, setSpeakers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/speakers')
      .then((res) => res.json())
      .then((data) => {
        setSpeakers(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        toast.error('Erreur de chargement')
        setLoading(false)
      })
  }, [])

  const handleDelete = async (id, name) => {
    if (!confirm(`Supprimer définitivement "${name}" ?`)) return
    const toastId = toast.loading('Suppression...')
    const res = await fetch(`/api/admin/speakers/${id}`, { method: 'DELETE', credentials: 'include' })

    if (res.ok) {
      setSpeakers((prev) => prev.filter((speaker) => speaker.id !== id))
      toast.success('Intervenant supprimé', { id: toastId })
    } else {
      toast.error('Erreur lors de la suppression', { id: toastId })
    }
  }

  const filtered = useMemo(() => {
    const value = search.toLowerCase()
    return speakers.filter((speaker) =>
      speaker.name?.toLowerCase().includes(value) ||
      speaker.bio?.toLowerCase().includes(value)
    )
  }, [speakers, search])

  return (
    <div className="pt-20 space-y-6">
      <section className="rounded-lg border border-white/10 bg-[#1F2937] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#10B981]">Annuaire</p>
            <h1 className="mt-1 flex items-center gap-2 text-3xl font-black text-[#F9FAFB]">
              <UserGroupIcon className="h-8 w-8 text-[#10B981]" />
              Intervenants
            </h1>
            <p className="mt-2 text-sm text-gray-400">{speakers.length} profil{speakers.length > 1 ? 's' : ''} disponible{speakers.length > 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/admin/speakers/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            <PlusIcon className="h-4 w-4" />
            Nouvel intervenant
          </Link>
        </div>

        <div className="relative mt-5 max-w-md">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher par nom ou bio..."
            className="w-full rounded-lg border-white/15 bg-[#1F2937] py-2.5 pl-10 pr-4 text-sm text-[#F9FAFB] placeholder:text-gray-400"
          />
        </div>
      </section>

      {loading ? (
        <div className="rounded-lg border border-white/10 bg-[#1F2937] shadow-sm">
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-[#1F2937] p-12 text-center text-gray-400 shadow-sm">
          {search ? 'Aucun intervenant ne correspond à cette recherche.' : 'Aucun intervenant.'}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((speaker) => (
            <article
              key={speaker.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D3DBC4]/35 hover:shadow-[0_22px_55px_rgba(15,37,45,0.28)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D3DBC4] via-[#9AA9A1] to-[#4E6670]" />

              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-[#D3DBC4]/20 bg-[#D3DBC4]/10 p-1">
                  <SpeakerAvatar name={speaker.name} photoUrl={speaker.photoUrl} size="md" />
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-gray-400">
                    <IdentificationIcon className="h-3.5 w-3.5" />
                    Intervenant
                  </span>

                  <h2 className="truncate text-xl font-black text-[#F9FAFB] transition group-hover:text-[#D3DBC4]">
                    {speaker.name}
                  </h2>
                </div>
              </div>

              <div className="mt-5 min-h-[7rem] rounded-xl border border-white/10 bg-[#111827]/45 p-4">
                <p className="line-clamp-4 text-sm leading-6 text-gray-400">
                  {speaker.bio || 'Aucune biographie renseignée.'}
                </p>
              </div>

              <div className="mt-5 flex justify-end gap-3 border-t border-white/10 pt-4">
                <Link
                  href={`/admin/speakers/${speaker.id}/edit`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#D3DBC4]/25 bg-[#D3DBC4]/10 px-3 py-2.5 text-sm font-bold text-[#D3DBC4] transition hover:-translate-y-0.5 hover:bg-[#D3DBC4]/15"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                  Modifier
                </Link>

                <button
                  onClick={() => handleDelete(speaker.id, speaker.name)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/20 px-3 py-2.5 text-sm font-bold text-red-300 transition hover:-translate-y-0.5 hover:bg-red-500/10"
                >
                  <TrashIcon className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}






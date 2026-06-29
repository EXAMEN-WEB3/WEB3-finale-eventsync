const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(error.error || res.statusText)
  }
  return res.json()
}

export const dataProvider = {
  getList: async (resource, { pagination, sort, filter }) => {
    const { page = 1, perPage = 25 } = pagination || {}
    const { field = 'id', order = 'ASC' } = sort || {}

    let data = await fetchJson(`${baseUrl}/api/${resource}`)

    if (filter) {
      const keys = Object.keys(filter)
      if (keys.length > 0) {
        data = data.filter((item) =>
          keys.every((key) => {
            const val = filter[key]
            if (typeof val === 'string') {
              return String(item[key] || '').toLowerCase().includes(val.toLowerCase())
            }
            return item[key] === val
          })
        )
      }
    }

    data.sort((a, b) => {
      const aVal = a[field] || ''
      const bVal = b[field] || ''
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal
      return order === 'ASC' ? cmp : -cmp
    })

    const total = data.length
    const start = (page - 1) * perPage
    const end = start + perPage
    return { data: data.slice(start, end), total }
  },

  getOne: async (resource, { id }) => {
    const data = await fetchJson(`${baseUrl}/api/${resource}/${id}`)
    return { data }
  },

  getMany: async (resource, { ids }) => {
    const data = await fetchJson(`${baseUrl}/api/${resource}?ids=${ids.join(',')}`)
    return { data }
  },

  create: async (resource, { data }) => {
    const result = await fetchJson(`${baseUrl}/api/admin/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return { data: result }
  },

  update: async (resource, { id, data }) => {
    const result = await fetchJson(`${baseUrl}/api/admin/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    return { data: result }
  },

  delete: async (resource, { id }) => {
    await fetchJson(`${baseUrl}/api/admin/${resource}/${id}`, {
      method: 'DELETE',
    })
    return { data: { id } }
  },

  deleteMany: async (resource, { ids }) => {
    await Promise.all(ids.map((id) =>
      fetchJson(`${baseUrl}/api/admin/${resource}/${id}`, {
        method: 'DELETE',
      })
    ))
    return { data: ids }
  },
}

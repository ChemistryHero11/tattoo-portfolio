import { Metadata } from 'next'
import AdminClient from './AdminClient'

export const metadata: Metadata = {
  title: 'Admin | Ink Master Portfolio',
  description: 'Admin panel for managing portfolio images',
}

export default function AdminPage() {
  return <AdminClient />
}

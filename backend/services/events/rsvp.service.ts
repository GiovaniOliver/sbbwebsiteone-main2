import { getDb } from '../../database/db'
import { RSVPStatus } from '../../lib/types/event'
import { v4 as uuidv4 } from 'uuid'

export interface RSVP {
  id: string
  eventId: string
  userId: string
  status: RSVPStatus
  createdAt: Date
  updatedAt: Date
}

export async function getRSVP(eventId: string, userId: string): Promise<RSVP | null> {
  const db = await getDb()
  
  const rsvp = await db.get<RSVP>(
    'SELECT * FROM rsvps WHERE event_id = ? AND user_id = ?',
    [eventId, userId]
  )

  if (!rsvp) return null

  return {
    ...rsvp,
    createdAt: new Date(rsvp.createdAt),
    updatedAt: new Date(rsvp.updatedAt)
  }
}

export async function createOrUpdateRSVP(
  eventId: string,
  userId: string,
  status: RSVPStatus
): Promise<RSVP> {
  const db = await getDb()
  const now = new Date().toISOString()

  const existingRsvp = await getRSVP(eventId, userId)

  if (existingRsvp) {
    await db.run(
      `UPDATE rsvps 
       SET status = ?, updated_at = ?
       WHERE event_id = ? AND user_id = ?`,
      [status, now, eventId, userId]
    )

    return {
      ...existingRsvp,
      status,
      updatedAt: new Date(now)
    }
  }

  const id = uuidv4()
  await db.run(
    `INSERT INTO rsvps (
      id, event_id, user_id, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [id, eventId, userId, status, now, now]
  )

  return {
    id,
    eventId,
    userId,
    status,
    createdAt: new Date(now),
    updatedAt: new Date(now)
  }
}

export async function deleteRSVP(eventId: string, userId: string): Promise<boolean> {
  const db = await getDb()

  const result = await db.run(
    'DELETE FROM rsvps WHERE event_id = ? AND user_id = ?',
    [eventId, userId]
  )

  return (result.changes ?? 0) > 0
}

export async function getEventRSVPs(eventId: string): Promise<RSVP[]> {
  const db = await getDb()
  
  const rsvps = await db.all<RSVP[]>(
    'SELECT * FROM rsvps WHERE event_id = ? ORDER BY created_at DESC',
    [eventId]
  )

  return rsvps.map(rsvp => ({
    ...rsvp,
    createdAt: new Date(rsvp.createdAt),
    updatedAt: new Date(rsvp.updatedAt)
  }))
} 
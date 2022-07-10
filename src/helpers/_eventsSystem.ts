/**
 * FOR INTERNAL USE ONLY.
 * Setup event system.
 */
export default function setupEventSystem(eventTypes: string[]) {
  type EventType = typeof eventTypes[number]
  type ListenerCallback = (...payload: any) => void

  const listeners: { [key: EventType]: ListenerCallback[] } = Object.fromEntries(
    eventTypes.map((event: EventType) => [event, []])
  )

  const broadcast = (eventType: EventType, ...payload: any) => {
    listeners[eventType].forEach(cb => cb(...payload))
  }

  const addEventListener = (eventType: EventType, callback: ListenerCallback) => {
    listeners[eventType].push(callback)
  }

  const removeEventListener = (eventType: EventType, callback: ListenerCallback) => {
    listeners[eventType] = listeners[eventType].filter(cb => cb !== callback)
  }

  return {
    internal: {
      broadcast
    },
    external: {
      addEventListener,
      removeEventListener
    }
  }
}
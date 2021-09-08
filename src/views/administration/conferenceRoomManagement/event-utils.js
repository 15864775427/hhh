
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '午饭时间',
    start: todayStr + 'T01:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

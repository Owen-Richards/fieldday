import React, {useEffect, useState} from 'react';

export default function InstantJoin() {
  const [sessions, setSessions] = useState<any[]>([]);
  useEffect(() => {
    fetch('http://localhost:4000/sessions')
      .then(r => r.json())
      .then(setSessions)
      .catch(() => setSessions([]));
  }, []);
  return (
    <main style={{padding: 24}}>
      <h1>Instant Join Demo</h1>
      <ul>
        {sessions.map(s => (
          <li key={s.id}>{s.title} — {new Date(s.startsAt).toLocaleString()}</li>
        ))}
      </ul>
    </main>
  );
}

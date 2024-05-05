"use server";

export async function createEvent(data) {
  const res = await fetch("http://localhost:3333/event", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function editEvent(data) {
  const res = await fetch("http://localhost:3333/event", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function join(data) {
  const res = await fetch("http://localhost:3333/participant", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function editParticipant(data) {
  const res = await fetch("http://localhost:3333/participant", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

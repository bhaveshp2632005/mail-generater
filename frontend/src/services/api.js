import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

const client = axios.create({ baseURL, timeout: 60000 });

// Turns any axios error into one readable sentence.
function toMessage(err) {
  if (err.response) {
    const detail = err.response.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length) {
      const first = detail[0];
      const field = String(first.loc?.[first.loc.length - 1] ?? "input").replace(/_/g, " ");
      return `Please check the ${field}: ${first.msg}.`;
    }
    return `The server returned an error (${err.response.status}). Please try again.`;
  }
  if (err.code === "ECONNABORTED") return "The request timed out. Please try again.";
  return `Cannot reach the MailGenie server at ${baseURL}. Make sure the backend is running.`;
}

async function post(path, payload) {
  try {
    const { data } = await client.post(path, payload);
    return data;
  } catch (err) {
    throw new Error(toMessage(err));
  }
}

export const generateEmail = (payload) => post("/api/generate-email", payload);
export const generateReply = (payload) => post("/api/generate-reply", payload);
export const improveEmail = (payload) => post("/api/improve-email", payload);

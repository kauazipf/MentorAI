import { api }  from "./api";

export const sendImageToIA = async (fileUri: string) => {
  const form = new FormData();
  form.append("image", {
    uri: fileUri,
    name: "photo.jpg",
    type: "image/jpeg"
  } as any);

  // se usar endpoint externo, substitua por process.env.IA_ENDPOINT_URL
  const endpoint = process.env.IA_ENDPOINT_URL || "http://10.0.2.2:8000/analyze";
  const resp = await fetch(endpoint, {
    method: "POST",
    body: form,
    headers: { Accept: "application/json" }
  });
  if (!resp.ok) throw new Error("IA Error");
  return resp.json();
};

import { supabase } from './supabase.js';

const HF_TOKEN = import.meta.env.VITE_HG_TOKEN;

export const embeddingData = async (text) => {
  const res = await fetch(
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  const embedding = await res.json();
  return embedding;
};

export const embedAndSave = async (product) => {
  const vector = await embeddingData(product.title + " " + product.description + " " + product.category);
  const { error } = await supabase.from("product_embeddings").insert({
    product_id: product.id,
    embedding: vector,
  });

  if (error) {
    console.error("Gagal menyimpan embedding:", error);
  } else {
    console.log("Berhasil menyimpan embedding untuk produk", product.id);
  }
};

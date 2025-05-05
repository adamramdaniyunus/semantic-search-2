create table product_embeddings (
  id uuid primary key default gen_random_uuid(),
  product_id int,
  embedding vector(384), -- ganti sesuai dimensi model kamu
  created_at timestamp default now()
);

CREATE OR REPLACE FUNCTION search_product_by_embedding(embedding_input vector)
RETURNS TABLE(product_id int, similarity FLOAT)
LANGUAGE SQL
AS $$
  SELECT
    product_id,
    GREATEST(0, 1 - (embedding <#> embedding_input)) AS similarity
  FROM product_embeddings
  ORDER BY embedding <#> embedding_input
  LIMIT 5;
$$;
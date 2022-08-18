export async function getCategories() {
  const URL = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await URL.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, product) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const URLCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${product}`);
  const data = await URLCategory.json();
  return data;
}

export async function getProductById(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const data = await (await fetch(url)).json();
  return data;
}

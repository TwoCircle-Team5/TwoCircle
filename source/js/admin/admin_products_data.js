import { allProduct } from "../../api/products/admin/allProduct_api.js";

export async function productDataHandler() {
  const data = await allProduct();

  const sunGlass = [];
  const goggles = [];
  const glassesFrame = [];
  const best = [];
  const newItem = [];
  const md = [];

  data.forEach((item) => {
    if (item.tags.includes("선글라스")) {
      sunGlass.push(item);
    }
    if (item.tags.includes("고글")) {
      goggles.push(item);
    }
    if (item.tags.includes("안경테")) {
      glassesFrame.push(item);
    }
    if (item.tags.includes("best")) {
      best.push(item);
    }
    if (item.tags.includes("new")) {
      newItem.push(item);
    }
    if (item.tags.includes("md")) {
      md.push(item);
    }
  });

  return {
    sunGlass,
    goggles,
    glassesFrame,
    best,
    newItem,
    md,
  };
}
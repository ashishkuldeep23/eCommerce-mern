// ─── Helpers ──────────────────────────────────────────────────────────────────

import { Entry, OptionInterface, OptionOut, Verity, VerityDataItem } from "../Type/type";

let _seq = 0;
const uid = () => String(++_seq);

export const newDataItem = (): VerityDataItem => ({
  id: uid(),
  name: "",
  price: "",
  stock: "",
});

export const newVerity = (): Verity => ({
  id: uid(),
  label: "",
  data: [newDataItem()],
});

export const newOption = (): OptionInterface => ({
  id: uid(),
  name: "",
  imgs: [""],
  verity: [newVerity()],
});




/** Strip internal ids, coerce "" → 0, drop blank image URLs */
export function toOutput(products: OptionInterface[]): OptionOut[] {
  return products.map(({ name, imgs, verity }) => ({
    name,
    imgs: imgs.filter(Boolean),
    verity: verity.map(({ label, data }) => ({
      label,
      data: data.map(({ name: dName, price, stock }) => ({
        name: dName,
        price: price === "" ? 0 : price,
        stock: stock === "" ? 0 : stock,
      })),
    })),
  }));
}

/** Deep-clone a product with fresh ids for every node */
export function cloneProduct(p: OptionInterface): OptionInterface {
  return {
    ...p,
    id: uid(),
    verity: p.verity.map((v) => ({
      ...v,
      id: uid(),
      data: v.data.map((d) => ({ ...d, id: uid() })),
    })),
  };
}



export const newEntry = (): Entry => ({ id: uid(), key: "", value: "" });



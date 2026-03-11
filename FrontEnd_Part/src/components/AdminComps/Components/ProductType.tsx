import { useEffect, useState } from "react";
import {
   OptionInterface,
   OptionOut,
   Verity,
   VerityDataItem,
} from "../../../Type/type";
import {
   cloneProduct,
   newDataItem,
   newOption,
   newVerity,
} from "../../../Helper/helper";

// ─── Types (internal — includes stable React keys) ────────────────────────────

// interface OptionInterface {
//   id: string; // internal key only
//   name: string;
//   imgs: string[];
//   verity: Verity[];
// }

// ─── Types (output — clean, no internal keys)

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = {
   Plus: () => (
      <svg
         width="16"
         height="16"
         viewBox="0 0 16 16"
         fill="none"
         stroke="currentColor"
         strokeWidth="2.2"
         strokeLinecap="round">
         <path d="M8 3v10M3 8h10" />
      </svg>
   ),
   Trash: () => (
      <svg
         width="15"
         height="15"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <polyline points="3 6 5 6 21 6" />
         <path d="M19 6l-1 14H6L5 6" />
         <path d="M10 11v6M14 11v6" />
         <path d="M9 6V4h6v2" />
      </svg>
   ),
   Img: () => (
      <svg
         width="15"
         height="15"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <rect x="3" y="3" width="18" height="18" rx="2" />
         <circle cx="8.5" cy="8.5" r="1.5" />
         <polyline points="21 15 16 10 5 21" />
      </svg>
   ),
   Tag: () => (
      <svg
         width="15"
         height="15"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
         <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
   ),
   ChevronDown: () => (
      <svg
         width="14"
         height="14"
         viewBox="0 0 14 14"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round">
         <path d="M3 5l4 4 4-4" />
      </svg>
   ),
   ChevronUp: () => (
      <svg
         width="14"
         height="14"
         viewBox="0 0 14 14"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round">
         <path d="M3 9l4-4 4 4" />
      </svg>
   ),
   Copy: () => (
      <svg
         width="14"
         height="14"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <rect x="9" y="9" width="13" height="13" rx="2" />
         <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
   ),
};

// ─── Shared Field ─────────────────────────────────────────────────────────────

interface FieldProps {
   label: string;
   value: string | number;
   onChange: (v: string) => void;
   placeholder?: string;
   type?: "text" | "number" | "url";
   required?: boolean;
   min?: number;
}

function Field({
   label,
   value,
   onChange,
   placeholder = "",
   type = "text",
   required = false,
   min,
}: FieldProps) {
   return (
      <label className="flex flex-col gap-1 w-full">
         <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            {label}
            {required && <span className="text-red-400 ml-0.5">*</span>}
         </span>
         <input
            type={type}
            value={value}
            min={min}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full bg-inherit rounded-xl border border-current/15 px-3 py-2.5 text-sm focus:outline-none focus:border-current/40 focus:ring-2 focus:ring-current/10 transition-all duration-150"
         />
      </label>
   );
}

// ─── Image URL Row ────────────────────────────────────────────────────────────

interface ImgRowProps {
   url: string;
   index: number;
   total: number;
   onChange: (v: string) => void;
   onRemove: () => void;
   onAdd: () => void;
}

function ImgRow({ url, index, total, onChange, onRemove, onAdd }: ImgRowProps) {
   const isLast = index === total - 1;
   const [preview, setPreview] = useState(false);

   return (
      <div className="flex flex-col gap-1">
         <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 flex-1 min-w-0 rounded-xl border border-current/15 bg-current/5 px-3 py-2.5 focus-within:border-current/40 focus-within:ring-2 focus-within:ring-current/10 transition-all duration-150">
               <span className="opacity-30 shrink-0">
                  <Icon.Img />
               </span>
               <input
                  type="url"
                  value={url}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={`Image URL ${index + 1}`}
                  className="flex-1 min-w-0  text-sm focus:outline-none bg-inherit rounded-xl"
               />
               {url && (
                  <button
                     type="button"
                     onClick={() => setPreview((p) => !p)}
                     aria-label="Toggle preview"
                     className="opacity-40 hover:opacity-80 transition shrink-0">
                     {preview ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
                  </button>
               )}
            </div>

            {total > 1 && (
               <button
                  type="button"
                  onClick={onRemove}
                  aria-label="Remove image"
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border border-current/15 opacity-40 hover:opacity-80 hover:border-red-400 hover:text-red-400 transition">
                  <Icon.Trash />
               </button>
            )}

            {isLast && (
               <button
                  type="button"
                  onClick={onAdd}
                  aria-label="Add image"
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border border-current/15 opacity-50 hover:opacity-90 hover:border-current/40 transition">
                  <Icon.Plus />
               </button>
            )}
         </div>

         {preview && url && (
            <div className="ml-8 rounded-xl overflow-hidden border border-current/10 h-28 bg-current/5">
               <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                     e.currentTarget.style.opacity = "0.2";
                  }}
               />
            </div>
         )}
      </div>
   );
}

// ─── Verity Data Item Row ─────────────────────────────────────────────────────
// One row inside a verity group: name / price / stock

interface DataItemRowProps {
   item: VerityDataItem;
   index: number;
   total: number;
   onChange: (field: keyof Omit<VerityDataItem, "id">, val: string) => void;
   onRemove: () => void;
   onAdd: () => void;
}

function DataItemRow({
   item,
   index,
   total,
   onChange,
   onRemove,
   onAdd,
}: DataItemRowProps) {
   return (
      <div className="flex flex-col gap-2 rounded-xl border border-current/10 bg-current/[0.02] p-2.5">
         <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">
               Options of option {index + 1}
            </span>
            <div className="flex gap-1">
               {total > 1 && (
                  <button
                     type="button"
                     onClick={onRemove}
                     aria-label="Remove option"
                     className="w-6 h-6 flex items-center justify-center rounded-lg border border-current/10 opacity-40 hover:opacity-80 hover:text-red-400 hover:border-red-400/50 transition">
                     <Icon.Trash />
                  </button>
               )}
               {index === total - 1 && (
                  <button
                     type="button"
                     onClick={onAdd}
                     aria-label="Add option"
                     className="w-6 h-6 flex items-center justify-center rounded-lg border border-current/10 opacity-50 hover:opacity-90 transition">
                     <Icon.Plus />
                  </button>
               )}
            </div>
         </div>

         <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 sm:col-span-1">
               <Field
                  label="Name"
                  value={item.name}
                  onChange={(val) => onChange("name", val)}
                  placeholder="e.g. Red"
                  required
               />
            </div>
            <Field
               label="Price"
               value={item.price}
               type="number"
               min={0}
               onChange={(val) => onChange("price", val)}
               placeholder="0"
               required
            />
            <Field
               label="Stock"
               value={item.stock}
               type="number"
               min={0}
               onChange={(val) => onChange("stock", val)}
               placeholder="0"
               required
            />
         </div>
      </div>
   );
}

// ─── Verity Group ─────────────────────────────────────────────────────────────
// One verity = a label (e.g. "Color") + its data items

interface VerityGroupProps {
   verity: Verity;
   index: number;
   canRemove: boolean;
   onChange: (v: Verity) => void;
   onRemove: () => void;
   onAdd: () => void;
   isLast: boolean;
}

function VerityGroup({
   verity,
   index,
   canRemove,
   onChange,
   onRemove,
   onAdd,
   isLast,
}: VerityGroupProps) {
   const [open, setOpen] = useState(true);

   const handleLabelChange = (label: string) => onChange({ ...verity, label });

   const handleDataChange = (
      i: number,
      field: keyof Omit<VerityDataItem, "id">,
      val: string,
   ) => {
      const data = verity.data.map((d, j) => {
         if (j !== i) return d;
         if (field === "price" || field === "stock") {
            return { ...d, [field]: val === "" ? ("" as const) : Number(val) };
         }
         return { ...d, [field]: val };
      });
      onChange({ ...verity, data });
   };

   const handleDataAdd = () =>
      onChange({ ...verity, data: [...verity.data, newDataItem()] });

   const handleDataRemove = (i: number) =>
      onChange({ ...verity, data: verity.data.filter((_, j) => j !== i) });

   return (
      <div className="rounded-2xl border border-current/15 overflow-hidden">
         {/* Group header */}
         <div className="flex items-center gap-2 px-3 py-2 bg-current/[0.04] border-b border-current/10">
            <span className="opacity-40 shrink-0">
               <Icon.Tag />
            </span>

            <input
               type="text"
               value={verity.label}
               onChange={(e) => handleLabelChange(e.target.value)}
               placeholder={`Variant label ${index + 1}  (e.g. S, M, L, XL.)`}
               required
               className="flex-1 min-w-0 text-sm font-medium focus:outline-none rounded-xl bg-inherit "
            />

            <div className="flex items-center gap-1 shrink-0">
               {canRemove && (
                  <button
                     type="button"
                     onClick={onRemove}
                     aria-label="Remove variant group"
                     className="w-7 h-7 flex items-center justify-center rounded-lg border border-current/10 opacity-40 hover:opacity-80 hover:text-red-400 hover:border-red-400/50 transition">
                     <Icon.Trash />
                  </button>
               )}
               {isLast && (
                  <button
                     type="button"
                     onClick={onAdd}
                     aria-label="Add variant group"
                     className="w-7 h-7 flex items-center justify-center rounded-lg border border-current/10 opacity-50 hover:opacity-90 transition">
                     <Icon.Plus />
                  </button>
               )}
               <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-label={open ? "Collapse" : "Expand"}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-current/10 opacity-40 hover:opacity-80 transition">
                  {open ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
               </button>
            </div>
         </div>

         {/* Data items */}
         {open && (
            <div className="p-2.5 flex flex-col gap-2">
               {verity.data.map((item, i) => (
                  <DataItemRow
                     key={item.id}
                     item={item}
                     index={i}
                     total={verity.data.length}
                     onChange={(field, val) => handleDataChange(i, field, val)}
                     onRemove={() => handleDataRemove(i)}
                     onAdd={handleDataAdd}
                  />
               ))}
            </div>
         )}
      </div>
   );
}

// ─── Product Entry ────────────────────────────────────────────────────────────

interface ProductEntryProps {
   product: OptionInterface;
   index: number;
   canRemove: boolean;
   onChange: (p: OptionInterface) => void;
   onRemove: () => void;
   onDuplicate: () => void;
   addProduct: () => void;
   productPrice?: undefined | number
}

function ProductEntry({
   product,
   index,
   canRemove,
   onChange,
   onRemove,
   onDuplicate,
   addProduct,
   // productPrice
}: ProductEntryProps) {
   const [open, setOpen] = useState(true);

   // ── name
   const handleNameChange = (name: string) => onChange({ ...product, name });

   // ── imgs
   const handleImgChange = (i: number, url: string) => {
      const imgs = [...product.imgs];
      imgs[i] = url;
      onChange({ ...product, imgs });
   };
   const handleImgAdd = () =>
      onChange({ ...product, imgs: [...product.imgs, ""] });
   const handleImgRemove = (i: number) =>
      onChange({ ...product, imgs: product.imgs.filter((_, j) => j !== i) });

   // ── verity groups
   const handleVerityChange = (i: number, updated: Verity) =>
      onChange({
         ...product,
         verity: product.verity.map((v, j) => (j === i ? updated : v)),
      });

   const handleVerityAdd = () =>
      onChange({ ...product, verity: [...product.verity, newVerity()] });

   const handleVerityRemove = (i: number) =>
      onChange({
         ...product,
         verity: product.verity.filter((_, j) => j !== i),
      });

   return (
      <div className="rounded-xl border p-2  overflow-hidden bg-inherit shadow-sm">
         {/* Card header */}
         <div className="flex items-center gap-3 px-4 border-current/10 bg-current/[0.03]">
            <span className="w-7 h-7 rounded-xl bg-current/10 flex items-center justify-center shrink-0 text-xs font-bold opacity-60">
               {index + 1}.
            </span>
            <span className="flex-1 min-w-0 text-sm font-semibold truncate opacity-70">
               {product.name || `Option ${index + 1}`}
            </span>
            <div className="flex items-center gap-1 shrink-0">
               <button
                  type="button"
                  onClick={onDuplicate}
                  title="Duplicate"
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-current/10 opacity-40 hover:opacity-80 transition">
                  <Icon.Copy />
               </button>
               {canRemove && (
                  <button
                     type="button"
                     onClick={onRemove}
                     title="Remove product"
                     className="w-8 h-8 flex items-center justify-center rounded-xl border border-current/10 opacity-40 hover:opacity-80 hover:text-red-400 hover:border-red-400/50 transition">
                     <Icon.Trash />
                  </button>
               )}
               <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  title={open ? "Collapse" : "Expand"}
                  className="w-8 h-8 flex items-center justify-center rounded-xl border border-current/10 opacity-40 hover:opacity-80 transition">
                  {open ? <Icon.ChevronUp /> : <Icon.ChevronDown />}
               </button>

               <button
                  type="button"
                  onClick={addProduct}
                  aria-label="Add entry"
                  className="w-7 h-7 flex items-center justify-center rounded-xl border border-current/15 opacity-50 hover:opacity-90 hover:border-current/40 transition">
                  <Icon.Plus />
               </button>
            </div>
         </div>

         {open && (
            <div className="p-4 flex flex-col gap-5">
               {/* Product name */}
               <Field
                  label="Option Name"
                  value={product.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Color, Option"
                  required
               />

               {/* Images */}
               <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 flex items-center gap-1.5">
                     <Icon.Img /> Images
                  </p>
                  <div className="flex flex-col gap-2">
                     {product.imgs.map((url, i) => (
                        <ImgRow
                           key={i}
                           url={url}
                           index={i}
                           total={product.imgs.length}
                           onChange={(v) => handleImgChange(i, v)}
                           onRemove={() => handleImgRemove(i)}
                           onAdd={handleImgAdd}
                        />
                     ))}
                  </div>
               </div>

               {/* Variant groups */}
               <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 flex items-center gap-1.5">
                     <Icon.Tag /> Variants
                  </p>
                  <div className="flex flex-col gap-2">
                     {product.verity.map((v, i) => (
                        <VerityGroup
                           key={v.id}
                           verity={v}
                           index={i}
                           canRemove={product.verity.length > 1}
                           isLast={i === product.verity.length - 1}
                           onChange={(updated) =>
                              handleVerityChange(i, updated)
                           }
                           onRemove={() => handleVerityRemove(i)}
                           onAdd={handleVerityAdd}
                        />
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

// ─── JSON Preview ─────────────────────────────────────────────────────────────

// function OutputPreview({ data }: { data: OptionOut[] }) {
//   const [copied, setCopied] = useState(false);
//   const json = JSON.stringify(data, null, 2);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(json);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       // clipboard unavailable (non-https / permissions denied)
//     }
//   };

//   return (
//     <div className="rounded-3xl border border-current/15 overflow-hidden bg-inherit">
//       <div className="flex items-center justify-between px-4 py-3 border-b border-current/10 bg-current/[0.03]">
//         <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
//           JSON Output
//         </span>
//         <button
//           type="button"
//           onClick={handleCopy}
//           className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-current/20 opacity-60 hover:opacity-100 transition">
//           <Icon.Copy />
//           {copied ? "Copied!" : "Copy"}
//         </button>
//       </div>
//       <pre className="text-xs p-4 overflow-x-auto leading-relaxed opacity-60 max-h-72 overflow-y-auto font-mono whitespace-pre-wrap break-all">
//         {json}
//       </pre>
//     </div>
//   );
// }

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ProductOptionForm({
   options,
   setOptions,
   productPrice
   // onSubmit,
}: {
   options: OptionInterface[];
   setOptions: React.Dispatch<React.SetStateAction<OptionInterface[]>>;
   onSubmit?: (data: OptionOut[]) => void;
   productPrice?: undefined | number
}) {

   useEffect(() => {

      if (productPrice) {
         setOptions((prev) => prev.map((x) => ({ ...x, verity: x.verity.map((y) => ({ ...y, data: y.data.map((z) => ({ ...z, price: productPrice, })) })) })));
      }
   }, [productPrice])

   // const [products, setProducts] = useState<OptionInterface[]>([newProduct()]);

   // console.log(options);

   // const [showOutput, setShowOutput] = useState(false);
   //   const [submitted, setSubmitted] = useState(false);
   //   const formRef = useRef<HTMLFormElement>(null);

   const updateProduct = (i: number, p: OptionInterface) =>
      setOptions((prev) => prev.map((x, j) => (j === i ? p : x)));

   const addProduct = () => setOptions((prev) => [...prev, newOption()]);

   const removeProduct = (i: number) =>
      setOptions((prev) => prev.filter((_, j) => j !== i));

   const duplicateProduct = (i: number) =>
      setOptions((prev) => {
         const clone = cloneProduct(prev[i]);
         return [...prev.slice(0, i + 1), clone, ...prev.slice(i + 1)];
      });

   // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
   //   e.preventDefault();
   //   const output = toOutput(options);
   //   onSubmit?.(output);
   //   setShowOutput(true);
   //   // setSubmitted(true);
   //   // setTimeout(() => setSubmitted(false), 2500);
   // };

   // const outputData = toOutput(options || [] );

   return (
      <div className=" bg-inherit text-inherit font-sans">
         {/* <form id="product-form" ref={formRef} onSubmit={handleSubmit}> */}
         <div className="w-full mx-auto px-4 py-1 flex flex-col gap-4">
            {/* Product cards — keyed by stable uid, not array index */}
            {options.map((p, i) => (
               <ProductEntry
                  key={p.id}
                  product={p}
                  index={i}
                  canRemove={options.length > 1}
                  onChange={(updated) => updateProduct(i, updated)}
                  onRemove={() => removeProduct(i)}
                  onDuplicate={() => duplicateProduct(i)}
                  addProduct={addProduct}
                  productPrice={productPrice}
               />
            ))}

            {/* Add product */}
            {/* <button
               type="button"
               onClick={addProduct}
               className="w-full py-3.5 rounded-3xl border-2 border-dashed border-current/20 text-sm font-semibold opacity-50 hover:opacity-90 hover:border-current/40 transition-all duration-200 flex items-center justify-center gap-2">
               <Icon.Plus /> Add Option
            </button> */}
         </div>
      </div>
   );
}

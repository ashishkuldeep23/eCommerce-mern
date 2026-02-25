// import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
//
// Both internal state and onSubmit output are plain string[].
// No wrapper objects, no internal ids — what you see is what you get.
//
// useState<string[]>  →  onSubmit(data: string[])

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
   GripVertical: () => (
      <svg
         width="14"
         height="14"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <circle cx="9" cy="6" r="1" fill="currentColor" />
         <circle cx="9" cy="12" r="1" fill="currentColor" />
         <circle cx="9" cy="18" r="1" fill="currentColor" />
         <circle cx="15" cy="6" r="1" fill="currentColor" />
         <circle cx="15" cy="12" r="1" fill="currentColor" />
         <circle cx="15" cy="18" r="1" fill="currentColor" />
      </svg>
   ),
   Import: () => (
      <svg
         width="14"
         height="14"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
         <polyline points="17 8 12 3 7 8" />
         <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
   ),
};

// ─── String Item Row ──────────────────────────────────────────────────────────

interface StrItemRowProps {
   value: string;
   index: number;
   total: number;
   isDuplicate: boolean;
   onChange: (val: string) => void;
   onRemove: () => void;
   onAdd: () => void;
   onCopy: () => void;
}

function StrItemRow({
   value,
   index,
   total,
   isDuplicate,
   onChange,
   onRemove,
   onAdd,
   onCopy,
}: StrItemRowProps) {
   const isLast = index === total - 1;
   const hasData = value.trim() !== "";
   const showDelete = hasData || total > 1;

   return (
      <div
         className={`group flex items-center gap-2 rounded-2xl border  transition-all duration-150 px-2 py-2
      ${
         isDuplicate
            ? "border-amber-400/50 bg-amber-400/5"
            : "bg-current/[0.02] hover:border-current/20"
      }`}>
         {/* Row number */}
         <span className="text-[10px] font-bold opacity-25 w-2 text-center shrink-0 select-none">
            {index + 1}
         </span>

         {/* Value input */}
         <div className="flex-1 min-w-0">
            <input
               type="text"
               value={value}
               onChange={(e) => onChange(e.target.value)}
               placeholder={`Item ${index + 1}`}
               aria-label={`Item ${index + 1}`}
               className={`w-full bg-transparent text-sm focus:outline-none
            ${isDuplicate ? "text-amber-500" : ""}`}
            />
            {isDuplicate && (
               <p className="text-[9px] text-amber-500 font-semibold mt-0.5">
                  Duplicate value
               </p>
            )}
         </div>

         {/* Actions */}
         <div className="flex items-center gap-1 shrink-0">
            {/* Copy — only when row has data */}
            {hasData && (
               <button
                  type="button"
                  onClick={onCopy}
                  aria-label="Copy to next row"
                  title="Copy to next row"
                  className="w-7 h-7 flex items-center justify-center rounded-xl border border-current/15 opacity-40 hover:opacity-90 hover:border-current/40 transition">
                  <Icon.Copy />
               </button>
            )}

            {/* Delete */}
            {showDelete && (
               <button
                  type="button"
                  onClick={onRemove}
                  aria-label="Remove item"
                  className={`w-7 h-7 flex items-center justify-center rounded-xl border transition
              ${
                 hasData
                    ? "border-red-400/30 text-red-400 opacity-60 hover:opacity-100 hover:border-red-400"
                    : "border-transparent opacity-0 group-hover:opacity-40 hover:!opacity-100 hover:text-red-400 hover:border-red-400/40"
              }`}>
                  <Icon.Trash />
               </button>
            )}

            {/* Add — only on last row */}
            {isLast && (
               <button
                  type="button"
                  onClick={onAdd}
                  aria-label="Add item"
                  className="w-7 h-7 flex items-center justify-center rounded-xl border border-current/15 opacity-50 hover:opacity-90 hover:border-current/40 transition">
                  <Icon.Plus />
               </button>
            )}
         </div>
      </div>
   );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function StringArrayFormApp({
   items,
   setItems,
}: {
   items: string[];
   setItems: React.Dispatch<React.SetStateAction<string[]>>;
}) {
   // ── state is plain string[] — no wrappers
   //    const [items, setItems] = useState<string[]>([""]);

   // ── duplicate detection directly on string[]
   const valueCount: Record<string, number> = {};
   for (const v of items) {
      const t = v.trim();
      if (t) valueCount[t] = (valueCount[t] ?? 0) + 1;
   }
   const hasDuplicates = Object.values(valueCount).some((c) => c > 1);

   // ── mutations — all operate on string[] directly
   const updateItem = (i: number, val: string) =>
      setItems((prev) => prev.map((x, j) => (j === i ? val : x)));

   const addItem = () => setItems((prev) => [...prev, ""]);

   const removeItem = (i: number) =>
      setItems((prev) => prev.filter((_, j) => j !== i));

   /** Insert a copy of items[i] right after index i */
   const copyItem = (i: number) =>
      setItems((prev) => [
         ...prev.slice(0, i + 1),
         prev[i],
         ...prev.slice(i + 1),
      ]);

   // Output preview: same filter — no transformation needed

   return (
      <div className=" bg-inherit text-inherit font-sans ">
         {/* <form id="str-form" ref={formRef} onSubmit={handleSubmit}> */}
         <div className=" w-full mx-auto p-1 flex flex-col gap-2">
            {/* Column label */}
            {/* <div className="flex items-center gap-2 px-2">
               <span className="w-4 shrink-0" /> 
               <span className="w-4 shrink-0" /> 
               <span className="flex-1 text-[10px] font-bold uppercase tracking-widest opacity-35">
                  Value
               </span>
               <span className="w-24 shrink-0" /> 
            </div> */}

            {/* Item list — index key is correct here since state is string[], not object[] */}
            <div className="flex flex-col gap-2">
               {items.map((value, i) => (
                  <StrItemRow
                     key={i}
                     value={value}
                     index={i}
                     total={items.length}
                     isDuplicate={
                        (valueCount[value.trim()] ?? 0) > 1 &&
                        value.trim() !== ""
                     }
                     onChange={(val) => updateItem(i, val)}
                     onRemove={() => removeItem(i)}
                     onAdd={addItem}
                     onCopy={() => copyItem(i)}
                  />
               ))}
            </div>

            {/* Add item */}
            {/* <button
               type="button"
               onClick={addItem}
               className="w-full py-3 rounded-2xl border-2 border-dashed border-current/15 text-sm font-semibold opacity-40 hover:opacity-80 hover:border-current/30 transition-all duration-200 flex items-center justify-center gap-2">
               <Icon.Plus /> Add Item
            </button> */}

            {/* Duplicate warning */}
            {hasDuplicates && (
               <div className="rounded-2xl border border-amber-400/40 bg-amber-400/5 px-4 py-3 text-xs text-amber-500 font-medium">
                  ⚠ Duplicate values detected — each item must be unique.
               </div>
            )}
         </div>
         {/* </form> */}
      </div>
   );
}

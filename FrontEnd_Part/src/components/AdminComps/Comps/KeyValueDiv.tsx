// import { useState } from "react";
import { Entry } from "../../../Type/type";
import { newEntry } from "../../../Helper/helper";

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _seq = 0;
const uid = () => String(++_seq);
// const newEntry = (): Entry => ({ id: uid(), key: "", value: "" });

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

// ─── Entry Row ────────────────────────────────────────────────────────────────

interface EntryRowProps {
   entry: Entry;
   index: number;
   total: number;
   /** Warn if this key already exists elsewhere */
   isDuplicate: boolean;
   onChange: (field: "key" | "value", val: string) => void;
   onRemove: () => void;
   onAdd: () => void;
   onCopy: () => void;
}

function EntryRow({
   entry,
   index,
   total,
   isDuplicate,
   onChange,
   onRemove,
   onAdd,
   onCopy,
}: EntryRowProps) {
   const isLast = index === total - 1;
   // Show delete when: row has any data, OR there are multiple rows
   const hasData = entry.key.trim() !== "" || entry.value.trim() !== "";
   //    const showDelete = hasData || total > 1;
   const showDelete = hasData && total > 1;

   return (
      <div
         className={`group flex items-center gap-1 rounded-2xl border transition-all duration-150 px-2 py-2
      ${isDuplicate ? "border-amber-400/50 bg-amber-400/5" : "border-current/10 bg-current/[0.02] hover:border-current/20"}`}>
         {/* Row number */}
         <span className="text-[10px] font-bold opacity-50 w-2 text-center shrink-0 select-none">
            {index + 1}
         </span>

         {/* Key input */}
         <div className="flex-1 min-w-0">
            <input
               type="text"
               value={entry.key}
               onChange={(e) => onChange("key", e.target.value)}
               placeholder="Key"
               required
               aria-label={`Key ${index + 1}`}
               className={`w-full bg-transparent text-sm font-medium  focus:outline-none
            ${isDuplicate ? "text-amber-500" : ""}`}
            />
            {isDuplicate && (
               <p className="text-[9px] text-amber-500 font-semibold mt-0.5">
                  Duplicate key
               </p>
            )}
         </div>

         {/* Separator */}
         <span className="text-current opacity-20 text-xs font-bold shrink-0 select-none">
            :
         </span>

         {/* Value input */}
         <div className="flex-1 min-w-0">
            <input
               type="text"
               value={entry.value}
               onChange={(e) => onChange("value", e.target.value)}
               placeholder="Value"
               aria-label={`Value ${index + 1}`}
               className="w-full bg-transparent text-sm  focus:outline-none"
            />
         </div>

         {/* Actions */}
         <div className="flex items-center gap-1 shrink-0">
            {/* Copy — only when row has data */}
            {hasData && (
               <button
                  type="button"
                  onClick={onCopy}
                  aria-label="Copy row to next"
                  className="w-7 h-7 flex items-center justify-center rounded-xl border border-current/15 opacity-40 hover:opacity-90 hover:border-current/40 transition"
                  title="Copy to next row">
                  <Icon.Copy />
               </button>
            )}
            {showDelete && (
               <button
                  type="button"
                  onClick={onRemove}
                  aria-label="Remove entry"
                  className={`w-7 h-7 flex items-center justify-center rounded-xl border transition
              ${
                 hasData
                    ? "border-red-400/30 text-red-400 opacity-60 hover:opacity-100 hover:border-red-400"
                    : "border-transparent opacity-0 group-hover:opacity-40 hover:!opacity-100 hover:text-red-400 hover:border-red-400/40"
              }`}>
                  <Icon.Trash />
               </button>
            )}
            {isLast && (
               <button
                  type="button"
                  onClick={onAdd}
                  aria-label="Add entry"
                  className="w-7 h-7 flex items-center justify-center rounded-xl border border-current/15 opacity-50 hover:opacity-90 hover:border-current/40 transition">
                  <Icon.Plus />
               </button>
            )}
         </div>
      </div>
   );
}

export default function KeyValueFormApp({
   entries,
   setEntries,
}: {
   entries: Entry[];
   setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}) {
   //    const [entries, setEntries] = useState<Entry[]>([newEntry()]);

   // ── duplicate key detection
   const keyCount: Record<string, number> = {};
   for (const e of entries) {
      const k = e.key.trim();
      if (k) keyCount[k] = (keyCount[k] ?? 0) + 1;
   }

   // ── entry mutations
   const updateEntry = (i: number, field: "key" | "value", val: string) =>
      setEntries((prev) =>
         prev.map((e, j) => (j === i ? { ...e, [field]: val } : e)),
      );

   const addEntry = () => setEntries((prev) => [...prev, newEntry()]);

   const removeEntry = (i: number) =>
      setEntries((prev) => prev.filter((_, j) => j !== i));

   /** Insert a clone of entry[i] right after index i with a fresh uid */
   const copyEntry = (i: number) =>
      setEntries((prev) => {
         const clone: Entry = { ...prev[i], id: uid() };
         return [...prev.slice(0, i + 1), clone, ...prev.slice(i + 1)];
      });

   return (
      <div className=" bg-inherit text-inherit font-sans">
         {/* Sticky header */}
         {/* <header className="sticky top-0 z-20 backdrop-blur-md bg-inherit/80 border-b border-current/10 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-sm font-bold tracking-tight">Attribute Builder</h1>
            <p className="text-[10px] opacity-40 mt-0.5">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowImport(true)}
              className="text-xs flex items-center gap-1.5 px-3 py-2 rounded-xl border border-current/20 opacity-60 hover:opacity-100 transition"
            >
              <Icon.Import /> Import
            </button>
            <button
              type="button"
              onClick={() => setShowOutput((v) => !v)}
              className="text-xs px-3 py-2 rounded-xl border border-current/20 opacity-60 hover:opacity-100 transition"
            >
              {showOutput ? "Hide" : "Preview"} JSON
            </button>
            <button
              type="submit"
              form="kv-form"
              disabled={hasDuplicates}
              className={`text-xs px-4 py-2 rounded-xl border font-semibold transition-all duration-200
                ${submitted
                  ? "border-green-400 text-green-400 scale-95"
                  : hasDuplicates
                  ? "border-amber-400/50 text-amber-400 opacity-60 cursor-not-allowed"
                  : "border-current bg-current text-white shadow-sm hover:scale-105 active:scale-95"
                }`}
            >
              {submitted ? "✓ Saved" : hasDuplicates ? "Fix Duplicates" : "Save"}
            </button>
          </div>
        </div>
      </header> */}

         {/* <form id="kv-form" ref={formRef} onSubmit={handleSubmit}> */}

         <div className=" w-full sm:w-[90%] ml-0 mx-auto p-0 flex flex-col gap-1">
            {/* Column labels */}
            <div className="flex items-center gap-2 px-2">
               <span className="w-4 shrink-0" /> {/* handle */}
               <span className="w-4 shrink-0" /> {/* number */}
               <span className="flex-1 text-[10px] font-bold uppercase tracking-widest opacity-35">
                  Key
               </span>
               <span className="w-4 shrink-0" /> {/* colon */}
               <span className="flex-1 text-[10px] font-bold uppercase tracking-widest opacity-35">
                  Value
               </span>
               <span className="w-16 shrink-0" /> {/* action buttons space */}
            </div>

            {/* Entry list */}
            <div className="flex flex-col gap-2">
               {entries.map((entry, i) => (
                  <EntryRow
                     key={entry.id}
                     entry={entry}
                     index={i}
                     total={entries.length}
                     isDuplicate={
                        (keyCount[entry.key.trim()] ?? 0) > 1 &&
                        entry.key.trim() !== ""
                     }
                     onChange={(field, val) => updateEntry(i, field, val)}
                     onRemove={() => removeEntry(i)}
                     onCopy={() => copyEntry(i)}
                     onAdd={addEntry}
                  />
               ))}
            </div>

            {/* Add entry row */}
            {/* <button
            type="button"
            onClick={addEntry}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-current/15 text-sm font-semibold opacity-40 hover:opacity-80 hover:border-current/30 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Icon.Plus /> Add Entry
          </button> */}

            {/* Duplicate warning banner */}
            {/* {hasDuplicates && (
            <div className="rounded-2xl border border-amber-400/40 bg-amber-400/5 px-4 py-3 text-xs text-amber-500 font-medium">
              ⚠ Duplicate keys detected — each key must be unique in this structure.
            </div>
          )} */}

            {/* JSON preview */}
            {/* {showOutput && <OutputPreview data={outputData} />} */}

            {/* Submit */}
            {/* <button
            type="submit"
            disabled={hasDuplicates}
            className={`w-full py-3.5 rounded-3xl text-sm font-bold border transition-all duration-200
              ${submitted
                ? "border-green-400 text-green-400"
                : hasDuplicates
                ? "border-amber-400/40 text-amber-400 opacity-60 cursor-not-allowed"
                : "border-current bg-current text-white shadow hover:scale-[1.01] active:scale-[0.99]"
              }`}
          >
            {submitted
              ? "✓ Saved!"
              : hasDuplicates
              ? "Fix duplicate keys to save"
              : `Save ${entries.filter((e) => e.key.trim()).length} ${entries.filter((e) => e.key.trim()).length === 1 ? "Entry" : "Entries"}`}
          </button> */}
         </div>

         {/* </form> */}

         {/* Import modal */}
         {/* {showImport && (
        <ImportModal
          onImport={handleImport}
          onClose={() => setShowImport(false)}
        />
      )} */}
      </div>
   );
}

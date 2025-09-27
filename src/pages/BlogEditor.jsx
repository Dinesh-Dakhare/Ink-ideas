import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { FaItalic, FaBold, FaImage } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { LuListOrdered } from "react-icons/lu";
import { GoListUnordered } from "react-icons/go";
export default function BlogEditor({ initialContent = "", onSave }) {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Underline,
      Strike,
      ListItem,
      BulletList,
      OrderedList,
      TextAlign.configure({
        types: ["heading", "paragraph"], // alignment works on these
      }),
    ],
    content: initialContent,
  });

  const insertImageFromFile = async (file) => {
    if (!file) return;

    // ask for alt text
    const alt = prompt("Enter alt text for the image:", "");

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data?.url) {
        editor
          .chain()
          .focus()
          .setImage({ src: data.url, alt: alt || file.name })
          .run();
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed");
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    insertImageFromFile(file);
    e.target.value = ""; // reset input
  };

  const savePost = async () => {
    if (!editor) return;
    setSaving(true);
    try {
      const contentHTML = editor.getHTML(); // get JSON with getJSON()
      await onSave({ title, content: contentHTML });
    } finally {
      setSaving(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="bg-gray-100 h-screen w-screen overflow-x-hidden">
      <div className="flex gap-2 mb-2 w-full flex-wrap justify-center items-center  h-12  bg-white sticky top-0 ring ring-gray-300">
        <button
          className="px-3 py-1 hover:border-2  border-black transition-full duration-100 ease-in-out rounded"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </button>

        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded font-bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic />
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-gray-200 px-2" : "px-2"}
        >
          U
        </button>

        {/* Strikethrough */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-gray-200 px-2" : "px-2"}
        >
          S
        </button>

        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) {
              editor
                .chain()
                .focus()
                .setLink({ href: url, target: "_blank" })
                .run();
            }
          }}
        >
          <CiLink />
        </button>
        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <GoListUnordered />
        </button>
        <button
          className={`px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <LuListOrdered />
        </button>
        {/* Align Left */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          L
        </button>

        {/* Align Center */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          C
        </button>

        {/* Align Right */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          R
        </button>

        {/* Justify */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          J
        </button>
        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        >
          ↳ Indent
        </button>
        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        >
          ↰ Outdent
        </button>
        <button
          className="px-3 py-1 hover:border-2 border-black transition-full duration-100 ease-in-out rounded"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaImage />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          hidden
        />
        <button
          className="px-2 py-1 bg-blue-600 text-white rounded-2xl font-medium hover:scale-105"
          onClick={savePost}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Post"}
        </button>
      </div>
      <div className="  mx-auto h-screen w-[70rem] mt-10 bg-white mb-20">
        {/* Toolbar */}
        <input
          className="w-full mb-4 p-2 rounded border ring-2 ring-blue-400"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Editor */}
        <div className="tiptap lg:tiptap-xl ring-2 ring-blue-400 rounded p-4 bg-white min-h-full">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

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
import {
  CiLink,
  CiTextAlignLeft,
  CiTextAlignRight,
  CiTextAlignCenter,
  CiTextAlignJustify,
} from "react-icons/ci";
import { LuListOrdered } from "react-icons/lu";
import { GoListUnordered } from "react-icons/go";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
export default function BlogEditor({ initialContent = "", onSave }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
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

    const form = new FormData();
    form.append("image", file);
    console.log(form);

    try {
      const res = await api.post("/api/v1/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201) {
        console.log(res.data);
        let url = res.data;

        editor.chain().focus().setImage({ src: url }).run();
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) insertImageFromFile(file);
    e.target.value = ""; // reset input
  };

  const savePost = async () => {
    if (!editor) return;
    setSaving(true);
    try {
      const postData = {
        title,
        contentJSON: editor.getJSON(),
        contentHTML: editor.getHTML(),
        category,
        tags: tags.split(",").map((t) => t.trim()), // comma-separated
        coverImage,
      };

      const res = await api.post("/api/v1/blogs", postData);
      if (res.status === 201) {
       console.log(res.data);
       alert(res.data.message);
       navigate("/home");
      }
    }catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="bg-gray-100 h-screen w-screen overflow-x-hidden">
      <div className="flex gap-2 mb-2 w-full flex-wrap justify-center items-center  h-12  bg-white sticky top-0 ring ring-gray-300">
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          P
        </button>

        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic />
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline")
              ? "bg-gray-200 px-2 "
              : "px-2 cursor-pointer"
          }
        >
          U
        </button>

        {/* Strikethrough */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "bg-gray-200 px-2 "
              : "px-2 cursor-pointer"
          }
        >
          S
        </button>

        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
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
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <GoListUnordered />
        </button>
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <LuListOrdered />
        </button>
        {/* Align Left */}
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <CiTextAlignLeft />
        </button>

        {/* Align Center */}
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <CiTextAlignCenter />
        </button>

        {/* Align Right */}
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <CiTextAlignRight />
        </button>

        {/* Justify */}
        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <CiTextAlignJustify />
        </button>

        <button
          className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaImage />
        </button>
        <input
          name="image"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          hidden
        />
        <button
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          onClick={savePost}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Post"}
        </button>
      </div>
      <div className="  mx-auto p-4 w-[70rem] mt-10 bg-white mb-20">
        {/* Toolbar */}
        <input
          className="w-full mb-6 border-b border-gray-300 focus:border-blue-500 outline-none py-2"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Cover Image URL"
          className="w-full mb-6 border-b border-gray-300 focus:border-blue-500 outline-none py-2"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full mb-6 border-b border-gray-300 focus:border-blue-500 outline-none py-2"
        />
        {/* Editor */}
        <div className="tiptap lg:tiptap-xl max-w-none border rounded-lg p-4 min-h-[300px] focus:outline-none">
          <EditorContent editor={editor} />
        </div>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full mt-6 border-b border-gray-300 focus:border-blue-500 outline-none py-2"
        />
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { app } from "../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage(app);

function Dashboard() {
  const [title, setTitle] = useState("");
  const [preface, setPreface] = useState("");

  const [file, setFile] = useState(null);
  const [imageMessage, setImageMessage] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  function handleFileSelect(e) {
    const img = e.target.files[0];
    console.log(img, e.target.value);
    setFile(img);
  }

  function handleCancelSelect() {
    setFile(null);
  }

  function handleUpload() {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageMessage(
          <p className="font-serif text-sm text-gray-600">
            Upload is <strong className="font-semibold">{percent}</strong>% done
          </p>
        );
      },
      err => {
        console.error(err);
        setImageMessage(
          <p className="font-serif text-sm text-red-600">
            Failed to upload image
          </p>
        );
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setFileUrl(url);
        setImageMessage(
          <p className="font-serif text-sm text-green-600">
            Image successfully uploaded!
          </p>
        );
      }
    );
  }

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <section className="py-10">
        <div className="max-w-screen-xl px-3 sm:px-6 md:px-12 lg:mx-auto xl:px-4">
          <div className="max-w-sm rounded-md bg-white px-7 py-8 shadow-md sm:max-w-md md:max-w-lg lg:mt-16">
            <h1 className="mb-4 font-sans text-2xl font-bold text-blue-900 sm:text-3xl md:text-4xl md:leading-tight">
              Let's write a new article
            </h1>
            <p className="mb-6 font-serif text-sm text-gray-600 sm:text-base lg:text-lg">
              Have an idea for a new article, or want to edit an existing one?
            </p>
            <div className="flex items-center gap-3 sm:gap-5">
              <button className="rounded-md bg-blue-900 py-2 px-3 font-serif text-sm font-medium text-white transition duration-200 hover:bg-blue-700 sm:px-5 md:text-base">
                Add new post
              </button>
              <button className="rounded-md bg-blue-900 py-2 px-3 font-serif text-sm font-medium text-white transition duration-200 hover:bg-blue-700 sm:px-5 md:text-base">
                Edit posts
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-8 md:py-14">
        <h2 className="mb-6 text-center text-xl font-bold text-blue-900 md:mb-12 md:text-3xl">
          Write an article
        </h2>
        <section className="mx-auto mb-12 grid max-w-sm grid-cols-1 px-4 sm:max-w-lg md:max-w-3xl md:grid-cols-2 md:gap-x-6 md:gap-y-8 lg:max-w-4xl lg:gap-x-10">
          <div className="mb-4 md:mb-0">
            <label
              htmlFor="title"
              className="mb-2 block font-serif text-sm text-gray-700 md:text-base"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-md border border-gray-400 py-2 pl-3 pr-2 font-serif text-sm text-gray-600"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <label
              htmlFor="preface"
              className="mb-2 block font-serif text-sm text-gray-700 md:text-base"
            >
              Preface
            </label>
            <input
              type="text"
              id="preface"
              className="block w-full rounded-md border border-gray-400 py-2 pl-3 pr-2 font-serif text-sm text-gray-600"
              name="preface"
              value={preface}
              onChange={e => setPreface(e.target.value)}
            />
          </div>
          <h5 className="col-span-full row-start-3 row-end-4 mb-2 font-serif text-sm text-gray-700 md:row-start-2 md:row-end-3 md:-mb-4 md:text-base">
            Add an image
          </h5>
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-8">
              <label
                htmlFor="file-input"
                className=" inline-block cursor-pointer rounded-md bg-blue-900 py-2 px-3 font-serif text-xs font-medium text-white transition duration-200 hover:bg-blue-700 sm:px-5 md:text-base"
              >
                Select file
              </label>
              <input
                type="file"
                className="hidden"
                id="file-input"
                onChange={handleFileSelect}
              />
              {file && (
                <button
                  onClick={handleCancelSelect}
                  className="font-serif text-sm text-blue-900 transition-colors duration-200 hover:text-blue-700"
                >
                  Cancel select
                </button>
              )}
            </div>
            {file && (
              <div className="mt-5 rounded-md border border-gray-400 py-2 pl-3 pr-2 font-serif text-sm text-gray-600">
                <p className="truncate font-serif text-sm text-gray-600">
                  {file.name}
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-6">
              <button
                disabled={!file}
                onClick={handleUpload}
                className={`rounded-md bg-blue-900 py-2 px-3 font-serif text-xs font-medium text-white transition duration-200 hover:bg-blue-${
                  file ? "700" : "900"
                } ${file ? "opacity-100" : "opacity-70"} sm:px-5 md:text-base`}
              >
                Upload
              </button>
              {imageMessage}
            </div>
            {fileUrl && (
              <div className="mt-5 rounded-md border border-gray-400 py-2 pl-3 pr-2 font-serif text-sm text-gray-600">
                <p className="truncate font-serif text-sm text-gray-600">
                  {fileUrl}
                </p>
              </div>
            )}
          </div>
        </section>
        <section className="mx-auto max-w-sm px-4 sm:max-w-lg md:max-w-3xl lg:max-w-4xl lg:px-0">
          <Editor
            apiKey={process.env.REACT_APP_TINY_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Roboto,sans-serif; font-size:16px }",
            }}
          />
          <button onClick={log}>Log editor content</button>
        </section>
      </section>
    </>
  );
}

export default Dashboard;

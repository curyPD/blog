import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { app } from "../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { async } from "@firebase/util";

const storage = getStorage(app);

function Dashboard() {
  const [image, setImage] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageMessage, setImageMessage] = useState("");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  function handleFileSelect(e) {
    setImageMessage("");
    const img = e.target.files[0];
    console.log(img, e.target.value);
    setImage(img);
  }

  function handleUpload() {
    const storageRef = ref(storage, `/files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      err => console.error(err),
      async () => {
        // download url
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(url);
        setImageMessage(
          `Image has been successfully uploaded!
          URL: ${url}`
        );
      }
    );
  }

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
          Write an Article
        </h2>
        <div className="mx-auto mb-10 px-4 sm:max-w-2xl sm:px-8 lg:max-w-4xl lg:px-0">
          <div className="rounded-md border border-gray-300 px-6 py-3">
            <h5 className="mb-3 text-center font-serif text-lg font-medium text-gray-700">
              Add an image
            </h5>
            <div>
              <label
                htmlFor="file-input"
                className=" inline-block cursor-pointer rounded-md bg-blue-900 py-2 px-3 font-serif text-sm font-medium text-white transition duration-200 hover:bg-blue-700 sm:px-5 md:text-base"
              >
                Select file
              </label>
              <input
                type="file"
                className="hidden"
                id="file-input"
                onChange={handleFileSelect}
              />
              {image && (
                <p className="mt-3 font-serif text-xs text-gray-600">
                  {image.name}
                </p>
              )}
            </div>
            {image && (
              <>
                <button
                  onClick={handleUpload}
                  className="mt-5 rounded-md bg-blue-900 py-2 px-3 font-serif text-sm font-medium text-white transition duration-200 hover:bg-blue-700 sm:px-5 md:text-base"
                >
                  Upload
                </button>
                <p className="mt-4 font-serif text-sm text-gray-600">
                  {percent}%
                </p>
              </>
            )}
            {imageMessage && (
              <p className="mt-4 font-serif text-xs text-gray-600">
                {imageMessage}
              </p>
            )}
          </div>
        </div>
        <div className="mx-auto px-4 sm:max-w-2xl sm:px-8 lg:max-w-4xl lg:px-0">
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
        </div>
      </section>
    </>
  );
}

export default Dashboard;

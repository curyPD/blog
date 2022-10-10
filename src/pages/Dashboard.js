import React, { useState, useEffect, useRef } from "react";
import SecondaryHeading from "../components/SecondaryHeading";
import QuaternaryHeading from "../components/QuaternaryHeading";

import { Editor } from "@tinymce/tinymce-react";
import { FileUploader } from "react-drag-drop-files";

import {
  HiOutlinePhotograph,
  HiOutlinePencil,
  HiOutlineDocumentAdd,
  HiOutlineLightBulb,
} from "react-icons/hi";

import { app } from "../firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const storage = getStorage(app);

function Dashboard() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    imageURL: "",
  });
  const [file, setFile] = useState(null);
  const [fileMessage, setFileMessage] = useState("");

  const editorRef = useRef(null);

  useEffect(() => {
    if (!file) return;
    function uploadImage() {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setFileMessage(
            <p className="text-xs text-gray-700">
              Upload is <strong className="font-semibold">{percent}</strong>%
              done
            </p>
          );
        },
        err => {
          console.error(err);
          setFileMessage(
            <p className="text-xs text-red-600">Failed to upload image</p>
          );
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setPostData(prevData => {
            return {
              ...prevData,
              imageURL: url,
            };
          });
          setFileMessage(
            <p className="text-xs text-green-600">
              Image successfully uploaded!
            </p>
          );
        }
      );
    }
    uploadImage();
  }, [file]);

  // function uploadImage() {
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     snapshot => {
  //       const percent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setImageMessage(
  //         <p className="font-sans text-sm text-gray-600">
  //           Upload is <strong className="font-semibold">{percent}</strong>% done
  //         </p>
  //       );
  //     },
  //     err => {
  //       console.error(err);
  //       setImageMessage(
  //         <p className="font-sans text-sm text-red-600">
  //           Failed to upload image
  //         </p>
  //       );
  //     },
  //     async () => {
  //       const url = await getDownloadURL(uploadTask.snapshot.ref);
  //       setFileUrl(url);
  //       setImageMessage(
  //         <p className="font-sans text-sm text-green-600">
  //           Image successfully uploaded!
  //         </p>
  //       );
  //     }
  //   );
  // }

  // function upload() {
  //   const content = editorRef.current.getContent();
  //   // addDocument(title, preface, fileUrl, content);
  //   setUploadMessage("Post added successfully!");
  //   setTitle("");
  //   setPreface("");
  //   setImageMessage("");
  //   setFileUrl("");
  //   setFile(null);
  //   editorRef.current.resetContent();
  // }

  return (
    <>
      <section className="pb-16 pt-12 pr-10">
        <div className="max-w-sm rounded-r bg-white px-4 pt-8 pb-12 shadow-sm">
          <h1 className="text-left font-serif text-3xl font-medium tracking-tight text-gray-800">
            It's time to share knowledge with the world.
          </h1>
        </div>
      </section>
      <section className="bg-white pt-4 pb-12">
        <SecondaryHeading sText="add post" hText="Let's get creative" />
        <section className="container mx-auto mb-12 px-4">
          <div className="mb-8">
            <QuaternaryHeading text="First, add a catchy title">
              <HiOutlineLightBulb className="text-sm text-blue-400" />
            </QuaternaryHeading>
            <label
              htmlFor="title"
              className="ml-1 block font-sans text-[9px] text-gray-300"
            >
              Article title
            </label>
            <input
              onChange={e =>
                setPostData(prevData => {
                  return {
                    ...prevData,
                    title: e.target.value,
                  };
                })
              }
              name="title"
              value={postData.title}
              className={`${
                postData.title ? "border-blue-600" : "border-gray-400"
              } block w-full border-b py-0.5 px-1 font-sans text-xs font-semibold text-blue-600 placeholder:text-gray-300 focus:border-blue-600 focus:outline-none`}
              type="text"
              id="title"
              placeholder="How to blink correctly"
            />
          </div>
          <div>
            <QuaternaryHeading text="Next, select a beautiful image">
              <HiOutlinePhotograph className="text-sm text-blue-400" />
            </QuaternaryHeading>
            <FileUploader
              types={["JPG", "PNG"]}
              children={
                <div className="flex items-center gap-2 rounded border-2 border-dashed border-gray-300 py-3 pr-2 pl-3">
                  <HiOutlineDocumentAdd className="text-base text-gray-500" />
                  <p className="text-xs text-gray-500">
                    <span className="cursor-pointer underline underline-offset-1 hover:no-underline">
                      Upload
                    </span>{" "}
                    or drop a file here
                  </p>
                </div>
              }
              handleChange={file => setFile(file)}
            />
          </div>
          {file && (
            <div className="mt-3">
              {fileMessage && <div>{fileMessage}</div>}
              <div
                className={
                  postData.imageURL
                    ? "mt-4 border border-gray-200 p-6"
                    : "mt-4 flex h-24 animate-pulse items-center justify-center bg-gray-300"
                }
              >
                {postData.imageURL && (
                  <img src={postData.imageURL} alt={file.name} />
                )}
              </div>
            </div>
          )}
        </section>
        <section className="container mx-auto mb-12 px-4">
          <QuaternaryHeading text="Finally, write down the ideas">
            <HiOutlinePencil className="text-sm text-blue-400" />
          </QuaternaryHeading>
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
                "body { font-family:Inter,sans-serif; font-size:14px }",
            }}
          />
        </section>
      </section>
    </>
  );
}

export default Dashboard;

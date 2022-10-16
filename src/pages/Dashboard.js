import React, { useState, useRef } from "react";
import PrimaryHeading from "../components/PrimaryHeading";
import SecondaryHeading from "../components/SecondaryHeading";
import QuaternaryHeading from "../components/QuaternaryHeading";

import { Editor } from "@tinymce/tinymce-react";
import { FileUploader } from "react-drag-drop-files";
import Button from "../components/Button";
import TdButton from "../components/TdButton";

import { useArticles } from "../contexts/ArticlesContext";

import {
  HiOutlinePhotograph,
  HiOutlinePencil,
  HiOutlineDocumentAdd,
  HiOutlineLightBulb,
} from "react-icons/hi";

import { app } from "../firebase";
import {
  getStorage,
  ref as storage_ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect } from "react";

const storage = getStorage(app);

function Dashboard() {
  const [trHeight, setTrHeight] = useState(0);
  const [trImageLoaded, setTrImageLoaded] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [overlayShown, setOverlayShown] = useState(false);
  const [dashboardMode, setDashboardMode] = useState("add");

  const [fileMessage, setFileMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({});

  const editorRef = useRef(null);
  const trRef = useRef(null);
  const workshopSectionRef = useRef(null);
  const postsSectionRef = useRef(null);

  const {
    uploadArticle,
    updateArticle,
    articles,
    editedArticleId,
    setEditedArticleId,
  } = useArticles();

  useEffect(() => {
    setTrHeight(trRef.current?.offsetHeight);
  }, [trImageLoaded]);

  useEffect(() => {
    if (dashboardMode === "add") {
      return init();
    }
    if (dashboardMode === "edit") {
      const editedArticle = articles.find(
        (article) => article.key === editedArticleId
      );
      if (!editedArticle) {
        return setDashboardMode("add");
      }
      setTitle(editedArticle.title);
      setImage({ ...editedArticle.image });
      editorRef.current.setContent(editedArticle.content);
    }
  }, [editedArticleId, dashboardMode]);

  function uploadImage(file) {
    console.log(file);
    if (!file) return;
    const storageRef = storage_ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFileMessage(
          <p className="text-xs text-gray-700">
            Upload is <strong className="font-medium">{percent}</strong>% done
          </p>
        );
      },
      (err) => {
        console.error(err);
        setFileMessage(
          <p className="text-xs text-red-600">Failed to upload image</p>
        );
      },
      async () => {
        setFileMessage(null);
        const { contentType, name, size, timeCreated, updated } =
          uploadTask.snapshot.metadata;
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImage({
          url,
          name,
          size,
          type: contentType,
          created: timeCreated,
          updated,
        });
      }
    );
  }

  async function handleAddPost() {
    const content = editorRef.current.getContent();
    if (!content) return;
    const now = new Date().toISOString();
    await uploadArticle({ title, image, content, upload: now });
    init();
    postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function handleEditPost() {
    const content = editorRef.current?.getContent();
    const editedArticle = articles.find(
      (article) => article.key === editedArticleId
    );
    const created = editedArticle?.upload ?? "";
    const now = new Date().toISOString();
    await updateArticle({
      title,
      image,
      content,
      upload: created,
      updated: now,
    });
    postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function init() {
    setTitle("");
    setImage({});
    editorRef.current?.setContent("");
  }

  function showPopup(i) {
    setOverlayShown(true);
    setActivePopup(i);
  }

  function closePopup() {
    setActivePopup(null);
    setOverlayShown(false);
  }

  const tableRows = articles.map((article, i, arr) => {
    let formattedDate;
    if (article.updated) {
      const date = new Date(article.updated);
      formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date);
    } else if (!article.updated && article.upload) {
      const date = new Date(article.upload);
      formattedDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(date);
    }
    const itemProps = i === 0 ? { ref: trRef } : {};
    return (
      <tr key={article.key} {...itemProps}>
        <td className="py-2 px-3">
          <img
            src={article.image.url}
            alt=""
            className="w-16 max-w-none rounded-sm"
            onLoad={i === 0 ? () => setTrImageLoaded(true) : undefined}
          />
        </td>
        <td className="py-2 px-3 font-serif text-xs font-medium text-gray-600">
          {article.title}
        </td>
        <td className="py-2 px-3 text-[10px] font-normal text-gray-400">
          {article.key}
        </td>
        <td className="py-2 px-3 text-[10px] font-normal text-gray-400">
          {formattedDate}
        </td>
        <TdButton
          id={article.key}
          trHeight={trHeight}
          index={i}
          arrLength={arr.length}
          showPopup={() => showPopup(i)}
          closePopup={closePopup}
          popupOpen={i === activePopup}
          setDashboardMode={setDashboardMode}
          setEditedArticleId={() => setEditedArticleId(article.key)}
          scrollToSection={() =>
            workshopSectionRef.current.scrollIntoView({ behavior: "smooth" })
          }
        />
      </tr>
    );
  });

  return (
    <>
      {overlayShown && (
        <div
          className="absolute left-0 top-0 z-10 h-full w-full"
          onClick={closePopup}
        ></div>
      )}

      <section className="pb-16 pt-12">
        <PrimaryHeading text="It's time to share knowledge with the world." />
      </section>

      <section ref={postsSectionRef} className="bg-white pt-4 pb-12">
        <SecondaryHeading sText="your posts" hText="Review all your work" />
        <div className="container mx-auto px-4">
          <div className="relative mx-auto mb-5 w-full max-w-3xl">
            <table className="block w-full border-collapse overflow-x-auto overflow-y-visible rounded-sm border border-gray-200">
              <thead className="whitespace-nowrap border-b border-gray-200 bg-gray-100">
                <tr>
                  <th className="py-2 px-3 text-left text-xs font-normal text-gray-700">
                    Image
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-normal text-gray-700">
                    Title
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-normal text-gray-700">
                    Article Id
                  </th>
                  <th className="w-full py-2 px-3 text-left text-xs font-normal text-gray-700">
                    Last Updated
                  </th>
                  <th className="py-2 px-3"></th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">{tableRows}</tbody>
            </table>
          </div>
          <div className="mx-auto max-w-3xl">
            <Button
              type="button"
              text="add new post"
              outline={true}
              clickHandler={() => {
                setDashboardMode("add");
                workshopSectionRef.current.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            />
          </div>
        </div>
      </section>

      <section ref={workshopSectionRef} className="bg-white pt-4 pb-12">
        {dashboardMode === "add" ? (
          <SecondaryHeading sText="add post" hText="Let's get creative" />
        ) : (
          <SecondaryHeading sText="edit post" hText="Let's make some changes" />
        )}
        <section className="container mx-auto mb-12 px-4">
          <div className="mb-8">
            <QuaternaryHeading
              text={
                dashboardMode === "add"
                  ? "First, add a catchy title"
                  : "Change the title"
              }
            >
              <HiOutlineLightBulb className="text-sm text-blue-400" />
            </QuaternaryHeading>
            <label
              htmlFor="title"
              className="ml-1 block font-sans text-[9px] text-gray-300"
            >
              Article title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              value={title}
              className={`${
                title ? "border-blue-600" : "border-gray-400"
              } block w-full border-b py-0.5 px-1 font-sans text-xs font-semibold text-blue-600 placeholder:text-gray-300 focus:border-blue-600 focus:outline-none`}
              type="text"
              id="title"
              placeholder="How to blink correctly"
            />
          </div>
          <div className="mb-6">
            <QuaternaryHeading
              text={
                dashboardMode === "add"
                  ? "Next, select a beautiful image"
                  : "Choose a different image"
              }
            >
              <HiOutlinePhotograph className="text-sm text-blue-400" />
            </QuaternaryHeading>
            <FileUploader
              types={["JPG", "PNG"]}
              children={
                <div className="mb-2 flex items-center gap-2 rounded border-2 border-dashed border-gray-300 py-3 pr-2 pl-3">
                  <HiOutlineDocumentAdd className="text-base text-gray-500" />
                  <p className="text-xs text-gray-500">
                    <span className="cursor-pointer underline underline-offset-1 hover:no-underline">
                      Upload
                    </span>{" "}
                    or drop a file here
                  </p>
                </div>
              }
              handleChange={(file) => uploadImage(file)}
            />
            {fileMessage}
          </div>
          {image.url && (
            <div className="px-3">
              <p className="mb-5 truncate font-sans text-base font-medium text-gray-800">
                {image.name}
              </p>
              <div className="mx-auto mb-6 w-5/6">
                <img
                  src={image.url}
                  alt={image.name?.slice(0, image.name?.indexOf("."))}
                />
              </div>
              <p className="mb-2 text-xs text-gray-400">
                Name:
                <br />
                <span className="truncate text-gray-700">{image.name}</span>
              </p>
              <p className="mb-2 text-xs text-gray-400">
                Size:
                <br />
                <span className="truncate text-gray-700">
                  {image.size.toLocaleString("en-US")} bytes
                </span>
              </p>
              <p className="text-xs text-gray-400">
                Type:
                <br />
                <span className="truncate text-gray-700">{image.type}</span>
              </p>
            </div>
          )}
        </section>
        <section className="container mx-auto mb-12 px-4">
          <QuaternaryHeading
            text={
              dashboardMode === "add"
                ? "Finally, write something interesting"
                : "Make changes to the content"
            }
          >
            <HiOutlinePencil className="text-sm text-blue-400" />
          </QuaternaryHeading>
          <div className="mb-7">
            <Editor
              apiKey={process.env.REACT_APP_TINY_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "lists",
                  "link",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic | alignleft aligncenter " +
                  "alignright alignjustify | anchor link | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Inter,sans-serif; font-size:16px }",
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              text="upload"
              clickHandler={
                dashboardMode === "add" ? handleAddPost : handleEditPost
              }
            />
          </div>
        </section>
      </section>
    </>
  );
}

export default Dashboard;

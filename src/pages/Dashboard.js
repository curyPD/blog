import React, { useState, useEffect, useRef, useCallback } from "react";

import SecondaryHeading from "../components/SecondaryHeading";
import QuaternaryHeading from "../components/QuaternaryHeading";
import HeroSection from "../components/HeroSection";
import TableRow from "../components/TableRow";
import Button from "../components/Button";

import { Editor } from "@tinymce/tinymce-react";
import { FileUploader } from "react-drag-drop-files";

import { useArticles } from "../contexts/ArticlesContext";
import { useAuth } from "../contexts/AuthContext";

import {
  HiOutlinePhotograph,
  HiOutlinePencil,
  HiOutlineDocumentAdd,
  HiOutlineLightBulb,
} from "react-icons/hi";
import { RiLoader2Line } from "react-icons/ri";

import { app } from "../firebase";
import {
  getStorage,
  ref as storage_ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import PostDeleteDialog from "../components/PostDeleteDialog";

const storage = getStorage(app);

function Dashboard() {
  const [trHeight, setTrHeight] = useState(0);
  const [activePopup, setActivePopup] = useState(null);
  const [overlayShown, setOverlayShown] = useState(false);

  const [fileMessage, setFileMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({});

  const editorRef = useRef(null);
  const workshopSectionRef = useRef(null);
  const postsSectionRef = useRef(null);

  const init = useCallback(() => {
    setTitle("");
    setImage({});
    editorRef.current?.setContent("");
    setEditedArticleId("");
  }, [editorRef.current]);

  const {
    uploadArticle,
    updateArticle,
    articles,
    editedArticleId,
    setEditedArticleId,
    postIdToDelete,
    setPostIdToDelete,
    deleteArticle,
  } = useArticles();

  const { curUser } = useAuth();

  useEffect(() => {
    if (!editedArticleId) {
      init();
    } else {
      const editedArticle = articles.find(
        (article) => article.key === editedArticleId
      );
      setTitle(editedArticle.title);
      setImage({ ...editedArticle.image });
      editorRef.current?.setContent(editedArticle.content);
    }
  }, [editedArticleId, articles, init]);

  useEffect(() => {
    init();
  }, [init]);

  function uploadImage(file) {
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
          <p className="pl-1 text-xs text-gray-700 lg:pl-2 lg:text-sm">
            Upload is <strong className="font-medium">{percent}</strong>% done
          </p>
        );
      },
      (err) => {
        console.error(err);
        setFileMessage(
          <p className="pl-1 text-xs text-red-600 lg:pl-2 lg:text-sm">
            Failed to upload image
          </p>
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
    await uploadArticle({
      title,
      image,
      content,
      upload: now,
    });
    init();
    postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function handleEditPost() {
    const content = editorRef.current?.getContent();
    const editedArticle = articles.find(
      (article) => article.key === editedArticleId
    );
    const now = new Date().toISOString();
    await updateArticle({
      ...editedArticle,
      title,
      image,
      content,
      updated: now,
    });
    postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function handleDeletePost() {
    try {
      const articleToDelete = articles.find(
        (article) => article.key === postIdToDelete
      );
      if (!articleToDelete) return;
      const imagePath = articleToDelete.image?.name;
      const imageRef = storage_ref(storage, `files/${imagePath}`);
      await Promise.all([deleteObject(imageRef), deleteArticle()]);
    } catch (err) {
      console.error(err);
    }
  }

  function scrollToWorkshop() {
    if (workshopSectionRef?.current)
      workshopSectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function showPopup(i) {
    setOverlayShown(true);
    setActivePopup(i);
  }

  function closePopup() {
    setActivePopup(null);
    setOverlayShown(false);
  }

  const tableRows = [...articles].reverse().map((article, i, arr) => {
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

    return (
      <TableRow
        key={article.key}
        id={article.key}
        trHeight={trHeight}
        setTrHeight={setTrHeight}
        image={article.image}
        i={i}
        title={article.title}
        formattedDate={formattedDate}
        arrLength={arr.length}
        showPopup={() => showPopup(i)}
        closePopup={closePopup}
        popupOpen={i === activePopup}
        setEditedArticleId={() => setEditedArticleId(article.key)}
        setPostIdToDelete={() => setPostIdToDelete(article.key)}
        scrollToSection={() =>
          workshopSectionRef.current.scrollIntoView({ behavior: "smooth" })
        }
      />
    );
  });

  return curUser === "initialization" ? (
    <div className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <RiLoader2Line className="animate-spin text-6xl text-blue-400" />
    </div>
  ) : (
    <>
      {overlayShown && (
        <div
          className="absolute left-0 top-0 z-10 h-full w-full"
          onClick={closePopup}
        ></div>
      )}

      {postIdToDelete && (
        <PostDeleteDialog
          setPostIdToDelete={() => setPostIdToDelete("")}
          postIdToDelete={postIdToDelete}
          handleDeletePost={handleDeletePost}
        />
      )}

      <HeroSection
        sText="polyglot dream"
        hText="It's time to share knowledge with the world."
        pText="Make sure to change the heading when you can think of a more original one."
        buttonText="Get to work"
        clickHandler={scrollToWorkshop}
      />

      <section
        ref={postsSectionRef}
        className="bg-white pt-4 pb-12 sm:pt-8 md:pt-11 lg:pt-20 lg:pb-16 xl:pb-24 2xl:pb-28"
      >
        <SecondaryHeading sText="your posts" hText="Review all your work" />
        <div className="container mx-auto px-4 xl:max-w-screen-xl">
          <div className="relative mb-5 w-full max-w-3xl lg:max-w-none">
            <table className="block w-full border-collapse overflow-x-auto overflow-y-visible rounded-sm border border-gray-200">
              <thead className="whitespace-nowrap border-b border-gray-200 bg-gray-100">
                <tr>
                  <th className="py-2 px-3 text-left text-xs font-normal text-gray-700 md:py-3 md:px-4 md:text-sm lg:py-3 lg:px-5 lg:text-sm xl:px-6 xl:text-base">
                    Image
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-normal text-gray-700 md:py-3 md:px-4 md:text-sm lg:py-3 lg:px-5 lg:text-sm xl:px-6 xl:text-base">
                    Title
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-normal text-gray-700 md:py-3 md:px-4 md:text-sm lg:py-3 lg:px-5 lg:text-sm xl:px-6 xl:text-base">
                    Article Id
                  </th>
                  <th className="w-full py-2 px-3 text-left text-xs font-normal text-gray-700 md:py-3 md:px-4 md:text-sm lg:py-3 lg:px-5 lg:text-sm xl:px-6 xl:text-base">
                    Last Updated
                  </th>
                  <th className="py-2 px-3 md:py-3 md:px-4 lg:py-3 lg:px-5 lg:text-sm xl:px-6 xl:text-base"></th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {tableRows.length !== 0 ? (
                  tableRows
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 px-3 text-center text-xs text-gray-500 md:text-sm lg:py-5 xl:text-base"
                    >
                      There are no articles yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {articles.length !== 0 && (
            <div className="max-w-3xl lg:max-w-none">
              <Button
                type="button"
                text="add new post"
                outline={false}
                clickHandler={() => {
                  setEditedArticleId("");
                  workshopSectionRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              />
            </div>
          )}
        </div>
      </section>

      <section ref={workshopSectionRef} className="bg-white pt-4 pb-12">
        {!editedArticleId ? (
          <SecondaryHeading sText="add post" hText="Let's get creative" />
        ) : (
          <SecondaryHeading sText="edit post" hText="Let's make some changes" />
        )}
        <div className="container mx-auto mb-12 grid grid-cols-1 gap-y-10 px-4 md:grid-cols-[255px_1fr] md:items-start md:gap-y-0 md:gap-x-7 md:px-7 lg:grid-cols-[320px_1fr] lg:gap-x-9 xl:max-w-screen-xl xl:grid-cols-[420px_1fr] xl:gap-x-12">
          <section className="sm:rounded sm:border sm:border-gray-100 sm:px-5 sm:py-7 sm:shadow-lg md:px-3 md:py-5 xl:px-6 xl:py-7">
            <div className="mb-8 lg:mb-11 xl:mb-14">
              <QuaternaryHeading
                text={
                  !editedArticleId
                    ? "First, add a catchy title"
                    : "Change the title"
                }
              >
                <HiOutlineLightBulb className="text-sm text-blue-400 lg:text-base xl:text-2xl" />
              </QuaternaryHeading>
              <label
                htmlFor="title"
                className="ml-1 block font-sans text-[9px] text-gray-300 sm:text-[10px] lg:mb-1 lg:text-xs"
              >
                Article title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
                className={`${
                  title ? "border-blue-600" : "border-gray-400"
                } block w-full border-b py-0.5 px-1 font-sans text-xs font-semibold text-blue-600 placeholder:text-gray-300 focus:border-blue-600 focus:outline-none sm:text-sm lg:px-2 lg:py-1 lg:text-base xl:text-lg`}
                type="text"
                id="title"
                placeholder="How to blink correctly"
              />
            </div>
            <div>
              <QuaternaryHeading
                text={
                  !editedArticleId
                    ? "Next, select a beautiful image"
                    : "Choose a different image"
                }
              >
                <HiOutlinePhotograph className="text-sm text-blue-400 lg:text-base xl:text-2xl" />
              </QuaternaryHeading>
              <FileUploader
                types={["JPG", "PNG"]}
                children={
                  <div className="mb-2 flex items-center gap-2 rounded border-2 border-dashed border-gray-300 py-3 pr-2 pl-3 md:mb-4 lg:py-4">
                    <HiOutlineDocumentAdd className="text-base text-gray-500" />
                    <p className="text-xs text-gray-500 lg:text-sm">
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
              <div className="px-3 lg:px-4">
                <p className="mb-5 truncate font-sans text-base font-medium text-gray-800 lg:text-lg">
                  {image.name}
                </p>
                <div className="mx-auto mb-6 w-5/6">
                  <img
                    src={image.url}
                    alt={image.name?.slice(0, image.name?.indexOf("."))}
                  />
                </div>
                <p className="mb-2 text-xs text-gray-400 lg:text-sm">
                  Name:
                  <br />
                  <span className="truncate text-gray-700">{image.name}</span>
                </p>
                <p className="mb-2 text-xs text-gray-400 lg:text-sm">
                  Size:
                  <br />
                  <span className="truncate text-gray-700">
                    {image.size.toLocaleString("en-US")} bytes
                  </span>
                </p>
                <p className="text-xs text-gray-400 lg:text-sm">
                  Type:
                  <br />
                  <span className="truncate text-gray-700">{image.type}</span>
                </p>
              </div>
            )}
          </section>
          <section className="sm:rounded sm:border sm:border-gray-100 sm:px-5 sm:py-7 sm:shadow-lg md:px-3 md:py-5 xl:px-6 xl:py-7">
            <QuaternaryHeading
              text={
                !editedArticleId
                  ? "Finally, write something interesting"
                  : "Make changes to the content"
              }
            >
              <HiOutlinePencil className="text-sm text-blue-400 lg:text-base xl:text-2xl" />
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
                clickHandler={!editedArticleId ? handleAddPost : handleEditPost}
              />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Dashboard;

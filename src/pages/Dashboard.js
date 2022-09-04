import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function Dashboard() {
  /*
        ACTION PLAN

        Two options: 
         - Add New Post
         - Edit Existing Post
        
        ADD NEW POST:
         1. Display text editor
         2. Display ADD button
         3. Add new post to DB
         4. Display success message 🎉
         
        EDIT EXISTING POST:
         1. Display titles of all existing posts
         2. Get selected post from DB
         3. Display text editor with the post text
         4. After changes have been made, replace contents
            of the post in DB with new contents. Persist
            all the other data
         5. Display success message 🎉
        
    */
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
            <h1 className="mb-4 font-sans text-2xl font-normal text-blue-900 sm:text-3xl md:text-4xl md:leading-tight">
              Hey, Sexy
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
      <section className="bg-white py-8 md:py-10">
        <h2 className="mb-6 text-center text-xl text-blue-900 md:mb-10 md:text-3xl">
          Write an Article
        </h2>
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

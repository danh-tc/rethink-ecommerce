import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
  Alignment,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { useState } from "react";

export default function RichtextEditor({ ...props }) {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    setEditorData(editor.getData());
    console.log(editorData);
  };
  return (
    <div {...props}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "|",
            "link",
            "insertTable",
            "mediaEmbed",
            "|",
            "bulletedList",
            "numberedList",
            "indent",
            "outdent",
            "|",
            "alignment",
          ],
          plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            Undo,
            Alignment,
          ],
          initialData: "",
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
}

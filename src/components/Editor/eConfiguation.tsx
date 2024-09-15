import {
  Autoformat,
  BlockQuote,
  Bold,
  Essentials,
  FontBackgroundColor,
  CloudServices,
  Italic,
  CodeBlock,
  Mention,
  EasyImage,
  Image,
  ImageCaption,
  ImageStyle,
  ImageUpload,
  Indent,
  Paragraph,
  Undo,
  Heading,
  Link,
  List,
  FontFamily,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
  FontSize,
  FontColor,
  EditorConfig,
  FileRepository,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import CustomUploadAdapterPlugin from "./UploadAdapte";

export const editorConfiguration: EditorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "blockQuote",
      "insertTable",
      "codeBlock",
      "undo",
      "redo",
    ],
  },
  plugins: [
    FileRepository,
    CustomUploadAdapterPlugin,
    Autoformat,
    BlockQuote,
    Bold,
    FontSize,
    FontColor,
    FontFamily,
    FontBackgroundColor,
    CloudServices,
    Essentials,
    Heading,
    EasyImage,
    Image,
    ImageCaption,
    ImageStyle,
    Indent,
    Italic,
    Link,
    List,
    Paragraph,
    PasteFromOffice,
    ImageUpload,
    Table,
    TableToolbar,
    TextTransformation,
    Undo,
    CodeBlock,
  ],
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  codeBlock: {
    languages: [
      // Do not render the CSS class for the plain text code blocks.
      { language: "plaintext", label: "Plain text", class: "" },

      // Use the "php-code" class for PHP code blocks.
      { language: "php", label: "PHP", class: "php-code" },

      // Use the "js" class for JavaScript code blocks.
      // Note that only the first ("js") class will determine the language of the block when loading data.
      {
        language: "javascript",
        label: "JavaScript",
        class: "js javascript js-code",
      },

      // Python code blocks will have the default "language-python" CSS class.
      { language: "python", label: "Python" },
    ],
  },
};
export const editorConfigurationForComment: EditorConfig = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "link",
      "imageUpload",
      "blockQuote",
      "codeBlock",
      "undo",
      "redo",
    ],
  },
  plugins: [
    FileRepository,
    CustomUploadAdapterPlugin,
    Autoformat,
    BlockQuote,
    Bold,
    CloudServices,
    Essentials,
    EasyImage,
    Image,
    ImageCaption,
    ImageStyle,
    Indent, Paragraph,
    Italic,
    Link,
    List,
    PasteFromOffice,
    ImageUpload,
    TextTransformation,
    Undo,
    CodeBlock,
  ],
  codeBlock: {
    languages: [
      // Do not render the CSS class for the plain text code blocks.
      { language: "plaintext", label: "Plain text", class: "" },

      // Use the "php-code" class for PHP code blocks.
      { language: "php", label: "PHP", class: "php-code" },

      // Use the "js" class for JavaScript code blocks.
      // Note that only the first ("js") class will determine the language of the block when loading data.
      {
        language: "javascript",
        label: "JavaScript",
        class: "js javascript js-code",
      },

      // Python code blocks will have the default "language-python" CSS class.
      { language: "python", label: "Python" },
    ],
  },
};
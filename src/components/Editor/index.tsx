"use client";
import { ClassicEditor } from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { editorConfiguration ,editorConfigurationForComment} from "./eConfiguation";
import { useTheme } from "next-themes";
type EditorForType = "defaulf" | "minimal"
interface Props {
  height?:string;
  fieldName:string;
  type?:EditorForType;
  form: any;
}
const Editor = ({fieldName,  type='defaulf', form ,height="400px" }: Props) => {
  const editorType = type ==='defaulf' ? editorConfiguration : editorConfigurationForComment
  const { themes, theme } = useTheme();
  const root = document.documentElement;
  if (theme === "dark") {
    root?.style.setProperty("--ck-color-base-background", "#141414");
    root?.style.setProperty("--ck-color-text", "#fafafa");
  } else {
    root?.style.setProperty("--ck-color-base-background", "#fafafa");
    root?.style.setProperty("--ck-color-text", "#141414");
  }
  root?.style.setProperty("--ck-color-base-border", "#bfbfbf");
  root?.style.setProperty(
    "--ck-color-button-default-hover-background",
    "#bfbfbf"
  );
  return (
    <div>
      <style>{`.ck-editor__editable_inline { min-height: ${height}; }`}</style>
      <CKEditor
        editor={ClassicEditor}
        config={editorType}
        data={form.getValues(fieldName) || "<p></p>" }
        // onReady={(editor) => {
        //     // You can store the "editor" and use when it is needed.
        //     console.log('Editor is ready to use!', editor);
        // }}
        onChange={(_, editor) => {
          form.setValue(fieldName, editor.getData());
          //form.setFieldValue('description', editor.getData());
        }}
        // onBlur={(event, editor) => {
        //     console.log('Blur.', editor);
        // }}
        // onFocus={(event, editor) => {
        //     console.log('Focus.', editor);
        // }}
      />
    </div>
  );
};
export default Editor;

import { EOEditor, IEOEditor } from "@etsoo/editor";
import React from "react";

/**
 * EOEditor React Element
 */
export interface EOEditorElement extends HTMLElement, IEOEditor {}

/**
 * EOEditor extended props
 */
export type EOEditorExProps = React.DetailedHTMLProps<
  React.HTMLAttributes<EOEditorElement>,
  EOEditorElement
> &
  Partial<IEOEditor> & {
    /**
     * On backup callback
     */
    onBackup?: (content: string) => void;
  };

// Element extensions
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "eo-editor": EOEditorExProps;
    }
  }
}

// Make sure import the script
new EOEditor();

/**
 * EOEditor React Component
 */
export const EOEditorEx = React.forwardRef<EOEditorElement, EOEditorExProps>(
  (props, ref) => {
    // Destruct
    const { onBackup, cloneStyles = false, ...rest } = props;

    return (
      <eo-editor
        cloneStyles={cloneStyles}
        ref={(r) => {
          if (r == null) return;

          if (typeof ref === "function") ref(r);
          else if (ref) ref.current = r;

          if (onBackup) {
            r.addEventListener("backup", (event) => {
              const content = (event as CustomEvent).detail;
              onBackup(content);
            });
          }
        }}
        {...rest}
      />
    );
  }
);

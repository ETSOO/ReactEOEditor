import { EOEditor, IEOEditor } from "@etsoo/editor";
import React from "react";

/**
 * EOEditor extended props
 */
export type EOEditorExProps = React.DetailedHTMLProps<
  React.HTMLAttributes<EOEditor>,
  IEOEditor
> &
  Partial<IEOEditor> & {
    /**
     * On backup callback
     */
    onBackup?: (content: string) => void;

    /**
     * Ref to the EOEditor element
     */
    ref?: React.Ref<IEOEditor>;
  };

// Element extensions
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "eo-editor": EOEditorExProps;
      }
    }
  }
}

/**
 * EOEditor React Component
 */
export function EOEditorEx(props: EOEditorExProps) {
  // Destruct
  const { onBackup, ref, cloneStyles = false, ...rest } = props;

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

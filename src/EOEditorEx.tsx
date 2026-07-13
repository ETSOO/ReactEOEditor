import { EOEditorDefine, IEOEditor } from "@etsoo/editor";
import React from "react";

/**
 * EOEditor extended element
 */
export type EOEditorElement = IEOEditor & HTMLElement;

/**
 * EOEditor extended props
 */
export type EOEditorExProps = React.DetailedHTMLProps<
  React.HTMLAttributes<EOEditorElement>,
  EOEditorElement
> &
  Omit<Partial<EOEditorElement>, "children"> & {
    /**
     * On backup callback
     */
    onBackup?: (content: string) => void;

    /**
     * Ref to the EOEditor element
     */
    ref?: React.Ref<EOEditorElement>;
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
 * EOEditorDefine is called to define the custom element. It should be called before using the EOEditorEx component.
 */
EOEditorDefine();

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

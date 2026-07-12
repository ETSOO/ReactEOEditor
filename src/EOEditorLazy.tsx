import React, { Suspense } from "react";
import { EOEditorExProps } from "./EOEditorEx";

const EOEditorExLazy = React.lazy(() => import("./EOEditorEx"));

export function EOEditorLazy(props: EOEditorExProps) {
  return (
    <Suspense fallback={null}>
      <EOEditorExLazy {...props} />
    </Suspense>
  );
}

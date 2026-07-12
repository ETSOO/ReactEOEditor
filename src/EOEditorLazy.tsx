import React, { Suspense } from "react";
import { EOEditorExProps } from "./EOEditorEx.js";

const EOEditorExLazyLoaded = React.lazy(() => import("./EOEditorEx"));

export function EOEditorLazy(props: EOEditorExProps) {
  return (
    <Suspense fallback={null}>
      <EOEditorExLazyLoaded {...props} />
    </Suspense>
  );
}

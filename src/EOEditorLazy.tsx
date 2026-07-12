import React, { Suspense } from "react";
import { EOEditorExProps } from "./EOEditorEx";

const EOEditorExLazyLoaded = React.lazy(() => import("./EOEditorEx"));

export function EOEditorLazy(props: EOEditorExProps) {
  return (
    <Suspense fallback={null}>
      <EOEditorExLazyLoaded {...props} />
    </Suspense>
  );
}

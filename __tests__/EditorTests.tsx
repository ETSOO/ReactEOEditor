import { act, render } from "@testing-library/react";
import { EOEditorElement, EOEditorEx } from "../src";
import React from "react";

it("Render Editor", () => {
  // Editor ref
  const editorRef = React.createRef<EOEditorElement>();

  act(() => {
    render(
      <EOEditorEx ref={editorRef}>
        <p>
          Hello, <b>world</b>!
        </p>
      </EOEditorEx>
    );
  });

  expect(editorRef.current?.innerHTML).contains("<b>world</b>");
});

it("Render Editor with HTML entities", async () => {
  // Editor ref
  const editorRef = React.createRef<EOEditorElement>();

  act(() => {
    render(
      <EOEditorEx ref={editorRef}>
        &#x3C;p&#x3E;Hello, world! This is
        &#x3C;b&#x3E;BOLD&#x3C;/b&#x3E;.&#x3C;/p&#x3E;
      </EOEditorEx>
    );
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  Object.defineProperty(document, "readyState", {
    get: () => "complete",
    configurable: true
  });

  act(() => {
    // Dispatch the event to notify that the document is ready
    const event = new Event("readystatechange", { bubbles: true });
    document.dispatchEvent(event);
  });

  expect(editorRef.current?.textContent).contains("<b>BOLD</b>");
});

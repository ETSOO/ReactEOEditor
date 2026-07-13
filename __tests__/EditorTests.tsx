import { act, render } from "@testing-library/react";
import React from "react";
import { EOEditorEx } from "../src/EOEditorEx";
import { IEOEditor } from "@etsoo/editor";

Object.defineProperty(HTMLIFrameElement.prototype, "contentWindow", {
  get() {
    return {
      addEventListener: vi.fn(),
      document: {
        head: {
          insertAdjacentHTML: vi.fn()
        },
        body: {
          addEventListener: vi.fn(),
          focus: vi.fn(),
          innerHTML: "Hello, <b>world</b>!"
        },
        addEventListener: vi.fn(),
        execCommand: vi.fn().mockReturnValue(true)
      }
    } as unknown as Window;
  }
});

it("Render Editor", () => {
  // Editor ref
  const editorRef = React.createRef<IEOEditor>();

  act(() => {
    render(
      <EOEditorEx ref={editorRef}>
        <p>
          Hello, <b>world</b>!
        </p>
      </EOEditorEx>
    );
  });

  expect(editorRef.current).not.toBeNull();
  expect(editorRef.current?.editorWindow).not.toBeNull();
});

it("Render Editor with HTML entities", async () => {
  // Editor ref
  const editorRef = React.createRef<IEOEditor>();

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

  expect(editorRef.current).not.toBeNull();
  expect(editorRef.current?.editorWindow).not.toBeNull();
});

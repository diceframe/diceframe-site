import { createFileRoute, notFound } from "@tanstack/react-router";
import { docsPageSeo } from "~/config/seo";
import { fetchDocContent } from "~/docs/github";
import { findDoc } from "~/docs/documents";
import { DocsPage } from "~/pages/DocsPage";

export const Route = createFileRoute("/en/docs/$docId")({
  beforeLoad: ({ params }) => {
    if (!findDoc(params.docId)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const doc = findDoc(params.docId);
    if (!doc) throw notFound();
    const result = await fetchDocContent({
      data: { repo: doc.repo, path: doc.en },
    });
    return { doc, result };
  },
  head: ({ loaderData }) => {
    const doc = loaderData?.doc;
    if (!doc) return { meta: [], links: [], scripts: [] };
    return docsPageSeo(doc, "en");
  },
  component: DocsRoute,
});

function DocsRoute() {
  const { doc, result } = Route.useLoaderData();
  return <DocsPage language="en" doc={doc} result={result} />;
}

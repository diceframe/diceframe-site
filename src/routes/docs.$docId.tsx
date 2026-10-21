import { createFileRoute, notFound } from "@tanstack/react-router";
import { docsPageSeo } from "~/config/seo";
import { fetchDocContent } from "~/docs/github";
import { findDoc } from "~/docs/documents";
import { DocsPage } from "~/pages/DocsPage";

export const Route = createFileRoute("/docs/$docId")({
  beforeLoad: ({ params }) => {
    if (!findDoc(params.docId)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const doc = findDoc(params.docId);
    if (!doc) throw notFound();
    const result = await fetchDocContent({
      data: { repo: doc.repo, path: doc.zh },
    });
    return { doc, result };
  },
  head: ({ loaderData }) => {
    const doc = loaderData?.doc;
    if (!doc) return { meta: [], links: [], scripts: [] };
    return docsPageSeo(doc, "zh");
  },
  component: DocsRoute,
});

function DocsRoute() {
  const { doc, result } = Route.useLoaderData();
  return <DocsPage language="zh" doc={doc} result={result} />;
}

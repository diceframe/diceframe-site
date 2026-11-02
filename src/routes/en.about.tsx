import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/en/about")({
  head: () => infoPageSeo("about", "en"),
  component: () => <InfoPage id="about" language="en" />,
});

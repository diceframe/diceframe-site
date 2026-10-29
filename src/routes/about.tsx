import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/about")({
  head: () => infoPageSeo("about", "zh"),
  component: () => <InfoPage id="about" language="zh" />,
});

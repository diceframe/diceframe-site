import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/contact")({
  head: () => infoPageSeo("contact", "zh"),
  component: () => <InfoPage id="contact" language="zh" />,
});

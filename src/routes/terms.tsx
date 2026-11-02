import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/terms")({
  head: () => infoPageSeo("terms", "zh"),
  component: () => <InfoPage id="terms" language="zh" />,
});

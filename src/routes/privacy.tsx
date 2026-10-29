import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/privacy")({
  head: () => infoPageSeo("privacy", "zh"),
  component: () => <InfoPage id="privacy" language="zh" />,
});

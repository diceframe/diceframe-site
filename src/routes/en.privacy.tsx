import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/en/privacy")({
  head: () => infoPageSeo("privacy", "en"),
  component: () => <InfoPage id="privacy" language="en" />,
});

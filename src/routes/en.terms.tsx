import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/en/terms")({
  head: () => infoPageSeo("terms", "en"),
  component: () => <InfoPage id="terms" language="en" />,
});

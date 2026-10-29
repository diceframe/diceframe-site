import { createFileRoute } from "@tanstack/react-router";
import { infoPageSeo } from "~/config/seo";
import { InfoPage } from "~/pages/InfoPage";

export const Route = createFileRoute("/en/contact")({
  head: () => infoPageSeo("contact", "en"),
  component: () => <InfoPage id="contact" language="en" />,
});

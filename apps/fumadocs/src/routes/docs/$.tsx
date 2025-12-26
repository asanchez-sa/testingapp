import browserCollections from "fumadocs-mdx:collections/browser";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Boxes, Cpu, PencilRuler, TabletSmartphone } from "lucide-react";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export const Route = createFileRoute("/docs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});

const serverLoader = createServerFn({
  method: "GET",
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);

    if (!page) {
      throw notFound();
    }

    return {
      path: page.path,
      pageTree: await source.serializePageTree(source.getPageTree()),
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <DocsPage
        tableOfContent={{
          style: "clerk",
        }}
        toc={toc}
      >
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
            }}
          />
        </DocsBody>
      </DocsPage>
    );
  },
});

function Page() {
  const data = Route.useLoaderData();
  const { pageTree } = useFumadocsLoader(data);
  const Content = clientLoader.getComponent(data.path);

  return (
    <DocsLayout
      {...baseOptions()}
      sidebar={{
        tabs: [
          {
            title: "Core",
            description: "Hello World!",
            url: "/docs/core",
            icon: <Cpu className="size-full" />,
          },
          {
            title: "Apps",
            description: "Hello World!",
            url: "/docs/apps",
            icon: <TabletSmartphone className="size-full" />,
          },
          {
            title: "Packages",
            description: "Hello World!",
            url: "/docs/packages",
            icon: <Boxes className="size-full" />,
          },
          {
            title: "Tools",
            description: "Hello World!",
            url: "/docs/tools",
            icon: <PencilRuler className="size-full" />,
          },
        ],
      }}
      tree={pageTree}
    >
      <Content />
    </DocsLayout>
  );
}

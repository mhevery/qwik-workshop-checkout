import { component$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import {
  getBuilderSearchParams,
  getContent,
  RenderContent,
} from "@builder.io/sdk-qwik";

export const BUILDER_PUBLIC_API_KEY = "26950364a825464593a7fc11c6bbda89"; // ggignore

export const builderContentLoader = loader$(({ url }) => {
  const query: Record<string, any> = {};
  url.searchParams.forEach((value, key) => (query[key] = value));
  return getContent({
    model: "hero",
    apiKey: BUILDER_PUBLIC_API_KEY,
    options: {
      ...getBuilderSearchParams(query),
      cachebust: true,
    },
    userAttributes: {
      urlPath: url.pathname || "/",
    },
  });
});

export default component$(() => {
  const builderContent = builderContentLoader.use();
  return (
    <div>
      <RenderContent
        model="page"
        content={builderContent.value}
        apiKey={BUILDER_PUBLIC_API_KEY}
      />
    </div>
  );
});

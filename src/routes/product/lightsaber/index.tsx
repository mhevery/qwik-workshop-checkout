import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  getContent,
  RenderContent,
  getBuilderSearchParams,
} from "@builder.io/sdk-qwik";

export const BUILDER_PUBLIC_API_KEY = "26950364a825464593a7fc11c6bbda89"; // ggignore
export default component$(() => {
  const location = useLocation();
  const builderContentRsrc = useResource$<any>(() => {
    return getContent({
      model: "page",
      apiKey: BUILDER_PUBLIC_API_KEY,
      options: getBuilderSearchParams(location.query),
      userAttributes: {
        urlPath: location.pathname || "/",
      },
    });
  });

  return (
    <>
      <Resource
        value={builderContentRsrc}
        onPending={() => <div>Loading...</div>}
        onResolved={(content) => (
          <RenderContent
            model="page"
            content={content}
            apiKey={BUILDER_PUBLIC_API_KEY}
            // Optional: pass in a custom component registry
            // customComponents={CUSTOM_COMPONENTS}
          />
        )}
      />
    </>
  );
});
